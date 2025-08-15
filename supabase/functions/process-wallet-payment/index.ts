import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[PROCESS-WALLET-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    const { 
      spotId, 
      vehicleId, 
      duration, 
      price 
    } = await req.json();

    if (!spotId || !vehicleId || !duration || !price) {
      throw new Error("Missing required parameters");
    }

    logStep("Payment parameters", { spotId, vehicleId, duration, price });

    // Check if user has sufficient balance
    const { data: wallet, error: walletError } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (walletError || !wallet) {
      throw new Error("Wallet not found or error fetching balance");
    }

    if (wallet.balance < price) {
      throw new Error(`Insufficient balance. Current: R$ ${wallet.balance}, Required: R$ ${price}`);
    }

    logStep("Balance check passed", { currentBalance: wallet.balance, requiredAmount: price });

    // Check if spot is available
    const { data: spot, error: spotError } = await supabaseClient
      .from('parking_spots')
      .select('available')
      .eq('id', spotId)
      .single();

    if (spotError || !spot || !spot.available) {
      throw new Error("Parking spot is not available");
    }

    // Check for existing active reservation for this spot
    const { data: activeReservation, error: reservationCheckError } = await supabaseClient
      .from('reservations')
      .select('id')
      .eq('spot_id', spotId)
      .eq('status', 'active')
      .maybeSingle();

    if (reservationCheckError) {
      throw new Error("Error checking existing reservations");
    }

    if (activeReservation) {
      throw new Error("This parking spot already has an active reservation");
    }

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

    // Create reservation
    const { data: reservation, error: reservationError } = await supabaseClient
      .from('reservations')
      .insert({
        user_id: user.id,
        spot_id: spotId,
        vehicle_id: vehicleId,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration: duration,
        price: price,
        payment_status: 'paid',
        status: 'active'
      })
      .select()
      .single();

    if (reservationError) {
      throw new Error(`Error creating reservation: ${reservationError.message}`);
    }

    logStep("Reservation created", { reservationId: reservation.id });

    // Deduct amount from wallet using the secure function
    const { error: walletUpdateError } = await supabaseClient
      .rpc('update_wallet_balance', {
        p_user_id: user.id,
        p_amount: -price,
        p_transaction_type: 'reserva',
        p_description: `Pagamento da reserva ${reservation.id}`,
        p_reservation_id: reservation.id
      });

    if (walletUpdateError) {
      // Rollback reservation if wallet update fails
      await supabaseClient
        .from('reservations')
        .delete()
        .eq('id', reservation.id);
      
      throw new Error(`Error updating wallet: ${walletUpdateError.message}`);
    }

    logStep("Wallet updated successfully");

    return new Response(JSON.stringify({
      success: true,
      reservation: reservation,
      message: "Reserva criada com sucesso usando saldo da carteira!"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});