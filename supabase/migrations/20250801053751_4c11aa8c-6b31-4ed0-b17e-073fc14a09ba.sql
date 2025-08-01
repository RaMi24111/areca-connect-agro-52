-- Fix security warnings by setting proper search paths for functions

-- Update function to generate order numbers with secure search path
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(nextval('public.order_sequence')::TEXT, 6, '0');
END;
$$;

-- Update function to update timestamps with secure search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update function to set order numbers with secure search path
CREATE OR REPLACE FUNCTION public.set_order_number()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number = public.generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

-- Update function to update product quantity with secure search path
CREATE OR REPLACE FUNCTION public.update_product_quantity_after_order()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    UPDATE public.products 
    SET quantity_available = quantity_available - (
      SELECT SUM(quantity) 
      FROM public.order_items 
      WHERE order_id = NEW.id
    )
    WHERE id IN (
      SELECT product_id 
      FROM public.order_items 
      WHERE order_id = NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$;