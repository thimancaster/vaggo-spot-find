-- Create wallets table to store user balances
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on wallets table
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for wallets
CREATE POLICY "Users can view their own wallet" ON public.wallets
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own wallet" ON public.wallets
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own wallet" ON public.wallets
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create transactions table to track all wallet movements
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deposito', 'reserva', 'estorno')),
  description TEXT,
  reservation_id UUID REFERENCES public.reservations(id),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on transactions table
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own transactions" ON public.transactions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create trigger to update wallet updated_at timestamp
CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON public.wallets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to safely update wallet balance
CREATE OR REPLACE FUNCTION public.update_wallet_balance(
  p_user_id UUID,
  p_amount DECIMAL(10,2),
  p_transaction_type TEXT,
  p_description TEXT DEFAULT NULL,
  p_reservation_id UUID DEFAULT NULL,
  p_stripe_payment_intent_id TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  current_balance DECIMAL(10,2);
  new_balance DECIMAL(10,2);
BEGIN
  -- Get current balance
  SELECT balance INTO current_balance 
  FROM public.wallets 
  WHERE user_id = p_user_id;
  
  -- If wallet doesn't exist, create it
  IF current_balance IS NULL THEN
    INSERT INTO public.wallets (user_id, balance)
    VALUES (p_user_id, 0.00);
    current_balance := 0.00;
  END IF;
  
  -- Calculate new balance
  new_balance := current_balance + p_amount;
  
  -- Check if balance would go negative (except for admin operations)
  IF new_balance < 0 AND p_amount < 0 THEN
    RAISE EXCEPTION 'Insufficient balance. Current: %, Attempted: %', current_balance, p_amount;
  END IF;
  
  -- Update wallet balance
  UPDATE public.wallets 
  SET balance = new_balance,
      updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Record transaction
  INSERT INTO public.transactions (
    user_id, 
    amount, 
    type, 
    description, 
    reservation_id,
    stripe_payment_intent_id
  )
  VALUES (
    p_user_id, 
    p_amount, 
    p_transaction_type, 
    p_description, 
    p_reservation_id,
    p_stripe_payment_intent_id
  );
  
  RETURN TRUE;
END;
$$;