-- Add spot_type column to parking_spots table
ALTER TABLE public.parking_spots 
ADD COLUMN spot_type TEXT NOT NULL DEFAULT 'comum';

-- Update existing parking spots with different types for demonstration
UPDATE public.parking_spots 
SET spot_type = CASE 
  WHEN (id::text)::uuid < gen_random_uuid() THEN 'comum'
  WHEN (id::text)::uuid < gen_random_uuid() THEN 'idoso'
  ELSE 'pcd'
END;

-- Add a check constraint to ensure valid spot types
ALTER TABLE public.parking_spots 
ADD CONSTRAINT check_spot_type 
CHECK (spot_type IN ('comum', 'idoso', 'pcd'));