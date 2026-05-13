-- 20260513_provision_pos_users_trigger.sql
-- Provisión automática de usuarios POS cuando se activa POS + Restaurante en el Launcher.
--
-- Schema real de pos_users:
--   id, usuarios_id, store_id, username, password_hash, role, active_modules, created_at, active
-- Constraint de roles: CHECK (role IN ('admin', 'tienda', 'bodega'))
-- store_id: NOT NULL, FK → public.stores(id)
-- stores se vincula al tenant vía: stores.usuarios_id

DO $$ 
BEGIN
  -- Constraint único para idempotencia (un tenant no puede tener dos usuarios con el mismo username)
  BEGIN
    ALTER TABLE public.pos_users ADD CONSTRAINT unique_tenant_username UNIQUE (usuarios_id, username);
  EXCEPTION
    WHEN duplicate_table THEN NULL;
    WHEN duplicate_object THEN NULL;
  END;
END $$;

CREATE OR REPLACE FUNCTION public.provision_pos_restaurant_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
-- search_path incluye 'extensions' para localizar pgcrypto (crypt/gen_salt)
SET search_path = public, extensions
AS $$
DECLARE
  v_old_pos      BOOLEAN := false;
  v_old_industry TEXT    := '';
  v_new_pos      BOOLEAN := false;
  v_store_id     UUID;
  v_default_hash TEXT;
BEGIN
  -- Extraer estado NUEVO
  v_new_pos := COALESCE((NEW.active_modules->>'pos')::boolean, false);

  -- Extraer estado ANTERIOR (solo en UPDATE)
  IF TG_OP = 'UPDATE' THEN
    v_old_pos      := COALESCE((OLD.active_modules->>'pos')::boolean, false);
    v_old_industry := COALESCE(OLD.industry, '');
  END IF;

  -- CONDICIÓN DE TRANSICIÓN:
  -- Solo provisionar cuando se ENTRA al estado POS + restaurant (no en ediciones repetidas)
  IF (v_new_pos = true AND NEW.industry = 'restaurant') AND
     (TG_OP = 'INSERT' OR NOT (v_old_pos = true AND v_old_industry = 'restaurant')) THEN

    -- Obtener el store_id de la primera tienda activa del tenant
    SELECT id INTO v_store_id
    FROM public.stores
    WHERE usuarios_id = NEW.id
    ORDER BY created_at ASC
    LIMIT 1;

    -- Si no existe tienda aún, no podemos crear usuarios (store_id es NOT NULL)
    IF v_store_id IS NULL THEN
      RAISE NOTICE 'provision_pos_restaurant_users: No store found for tenant %, skipping.', NEW.id;
      RETURN NEW;
    END IF;

    -- Generar hash bcrypt del PIN por defecto '1'
    v_default_hash := crypt('1', gen_salt('bf'));

    -- 1. ADM → rol admin (acceso total)
    IF NOT EXISTS (SELECT 1 FROM public.pos_users WHERE usuarios_id = NEW.id AND username = 'ADM') THEN
      INSERT INTO public.pos_users (usuarios_id, store_id, username, password_hash, role, active, active_modules)
      VALUES (
        NEW.id, v_store_id, 'ADM', v_default_hash, 'admin', true,
        '{"pos_restaurant": true, "billing": true, "inventory": true, "reports": true, "settings": true}'::jsonb
      );
    END IF;

    -- 2. RE → rol tienda (operación de sala/caja/pedidos)
    IF NOT EXISTS (SELECT 1 FROM public.pos_users WHERE usuarios_id = NEW.id AND username = 'RE') THEN
      INSERT INTO public.pos_users (usuarios_id, store_id, username, password_hash, role, active, active_modules)
      VALUES (
        NEW.id, v_store_id, 'RE', v_default_hash, 'tienda', true,
        '{"pos_restaurant": true, "billing": true, "orders": true, "shifts": true}'::jsonb
      );
    END IF;

    -- 3. BOD → rol bodega (inventario/compras/insumos)
    IF NOT EXISTS (SELECT 1 FROM public.pos_users WHERE usuarios_id = NEW.id AND username = 'BOD') THEN
      INSERT INTO public.pos_users (usuarios_id, store_id, username, password_hash, role, active, active_modules)
      VALUES (
        NEW.id, v_store_id, 'BOD', v_default_hash, 'bodega', true,
        '{"inventory": true, "purchases": true, "supplies": true}'::jsonb
      );
    END IF;

  END IF;

  RETURN NEW;
END;
$$;

-- Trigger sobre public.usuarios
DROP TRIGGER IF EXISTS on_usuario_pos_restaurant_activation ON public.usuarios;

CREATE TRIGGER on_usuario_pos_restaurant_activation
AFTER INSERT OR UPDATE OF active_modules, industry ON public.usuarios
FOR EACH ROW
EXECUTE FUNCTION public.provision_pos_restaurant_users();
