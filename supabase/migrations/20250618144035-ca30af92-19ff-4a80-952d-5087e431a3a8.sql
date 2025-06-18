
-- Criar tabela de veículos dos usuários
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  plate TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar tabela de vagas de estacionamento
CREATE TABLE public.parking_spots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  lat DECIMAL(10,8) NOT NULL,
  lng DECIMAL(10,8) NOT NULL,
  available BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar tabela de reservas
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles ON DELETE CASCADE NOT NULL,
  spot_id UUID REFERENCES public.parking_spots ON DELETE CASCADE NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- em minutos
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parking_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para vehicles
CREATE POLICY "Users can view own vehicles" 
  ON public.vehicles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vehicles" 
  ON public.vehicles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vehicles" 
  ON public.vehicles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vehicles" 
  ON public.vehicles FOR DELETE 
  USING (auth.uid() = user_id);

-- Políticas RLS para parking_spots (público - todos podem ver)
CREATE POLICY "Anyone can view parking spots" 
  ON public.parking_spots FOR SELECT 
  TO authenticated
  USING (true);

-- Políticas RLS para reservations
CREATE POLICY "Users can view own reservations" 
  ON public.reservations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reservations" 
  ON public.reservations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reservations" 
  ON public.reservations FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reservations" 
  ON public.reservations FOR DELETE 
  USING (auth.uid() = user_id);

-- Inserir algumas vagas de exemplo
INSERT INTO public.parking_spots (name, price, lat, lng, available) VALUES
('Zona Azul Centro', 8.00, -23.550520, -46.633308, true),
('Shopping Paulista', 12.00, -23.549000, -46.634000, true),
('Centro Histórico', 6.50, -23.551000, -46.632000, true),
('Estação Metrô', 10.00, -23.552000, -46.635000, true),
('Área Comercial', 9.00, -23.548500, -46.631500, true),
('Parque Ibirapuera', 15.00, -23.587416, -46.657634, true),
('Vila Madalena', 11.00, -23.544722, -46.691944, true),
('Bela Vista', 7.50, -23.559722, -46.642778, true);

-- Triggers para updated_at
CREATE TRIGGER handle_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_parking_spots_updated_at
  BEFORE UPDATE ON public.parking_spots
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
