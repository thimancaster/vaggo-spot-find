import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  try {
    logStep("Webhook received");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    // Verify webhook signature (you'll need to set STRIPE_WEBHOOK_SECRET)
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
      );
    } catch (err) {
      logStep("Webhook signature verification failed", { error: err });
      return new Response("Webhook signature verification failed", { status: 400 });
    }

    logStep("Event received", { type: event.type, id: event.id });

    // Handle payment_intent.succeeded for PIX payments
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      logStep("Processing payment intent", { 
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        metadata: paymentIntent.metadata 
      });

      // Check if this is a wallet credit payment
      if (paymentIntent.metadata?.type === "wallet_credit") {
        const userId = paymentIntent.metadata.user_id;
        const amount = parseFloat(paymentIntent.metadata.amount);

        if (!userId || !amount) {
          throw new Error("Missing user_id or amount in payment metadata");
        }

        logStep("Processing wallet credit", { userId, amount });

        // Add credit to user's wallet using the secure function
        const { error: walletError } = await supabaseClient
          .rpc('update_wallet_balance', {
            p_user_id: userId,
            p_amount: amount,
            p_transaction_type: 'deposito',
            p_description: `Depósito via PIX - ${paymentIntent.id}`,
            p_stripe_payment_intent_id: paymentIntent.id
          });

        if (walletError) {
          logStep("Error updating wallet", { error: walletError });
          throw new Error(`Error updating wallet: ${walletError.message}`);
        }

        logStep("Wallet credit added successfully", { userId, amount });
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});