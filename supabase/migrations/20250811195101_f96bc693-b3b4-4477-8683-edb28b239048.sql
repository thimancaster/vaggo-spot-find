
-- Habilitar RLS nas tabelas existentes
ALTER TABLE public.parking_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Políticas para parking_spots (todos podem ver, apenas admins podem modificar)
CREATE POLICY "anyone_can_view_parking_spots" ON public.parking_spots
FOR SELECT
USING (true);

-- Políticas para profiles (usuários só veem seu próprio perfil)
CREATE POLICY "users_can_view_own_profile" ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "users_can_update_own_profile" ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "users_can_insert_own_profile" ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Políticas para reservations (usuários só veem suas próprias reservas)
CREATE POLICY "users_can_view_own_reservations" ON public.reservations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_reservations" ON public.reservations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_reservations" ON public.reservations
FOR UPDATE
USING (auth.uid() = user_id);

-- Políticas para vehicles (usuários só veem seus próprios veículos)
CREATE POLICY "users_can_view_own_vehicles" ON public.vehicles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_vehicles" ON public.vehicles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_vehicles" ON public.vehicles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_vehicles" ON public.vehicles
FOR DELETE
USING (auth.uid() = user_id);

-- Criar tabela de assinantes para controle de planos
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT DEFAULT 'free',
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Políticas para subscribers
CREATE POLICY "users_can_view_own_subscription" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "users_can_update_own_subscription" ON public.subscribers
FOR UPDATE
USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "service_role_can_manage_subscriptions" ON public.subscribers
FOR ALL
USING (true);

-- Atualizar tabela reservations para incluir status de pagamento
ALTER TABLE public.reservations 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;

-- Atualizar constraint para incluir novos status
ALTER TABLE public.reservations 
DROP CONSTRAINT IF EXISTS reservations_status_check;

ALTER TABLE public.reservations 
ADD CONSTRAINT reservations_status_check 
CHECK (status IN ('pending_payment', 'active', 'completed', 'cancelled'));

-- Atualizar constraint para payment_status
ALTER TABLE public.reservations 
ADD CONSTRAINT reservations_payment_status_check 
CHECK (payment_status IN ('pending', 'processing', 'paid', 'failed', 'refunded'));
