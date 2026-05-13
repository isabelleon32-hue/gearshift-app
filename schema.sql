-- Habilitar la extensión para generar UUIDs si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear un ENUM para los estados de las bahías
CREATE TYPE estado_bahia AS ENUM ('disponible', 'ocupada', 'mantenimiento');

-- Crear ENUM para los roles de usuario
CREATE TYPE rol_usuario AS ENUM ('admin', 'mecanico', 'cliente');

-- Tabla: perfiles (vínculo con auth.users de Supabase)
CREATE TABLE perfiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  rol rol_usuario DEFAULT 'cliente',
  nombre VARCHAR(100),
  telefono VARCHAR(20)
);

-- Trigger para crear perfil automáticamente al registrar un nuevo usuario
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles (id, nombre)
  VALUES (new.id, new.raw_user_meta_data->>'nombre');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Tabla: bahias_elevadores
CREATE TABLE bahias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  taller_id UUID, -- Soporte Multi-tenant
  nombre VARCHAR(50), -- Ej: "Elevador 1"
  estado estado_bahia DEFAULT 'disponible'
);

-- Tabla: presupuestos
CREATE TABLE presupuestos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  orden_id UUID,
  items JSONB, -- [{desc: 'Pastillas', precio: 50000, aceptado: null}]
  valor_diagnostico DECIMAL,
  descuento_diagnostico_aplicado BOOLEAN DEFAULT FALSE
);

-- Tablas adicionales sugeridas por los endpoints en la Estructura Maestra
CREATE TABLE vehiculos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID REFERENCES perfiles(id),
  patente VARCHAR(20) UNIQUE NOT NULL,
  marca VARCHAR(50),
  modelo VARCHAR(50),
  anio INT,
  color VARCHAR(30),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ordenes_trabajo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehiculo_id UUID REFERENCES vehiculos(id),
  bahia_id UUID REFERENCES bahias(id),
  mecanico_id UUID REFERENCES perfiles(id),
  estado VARCHAR(50) DEFAULT 'creada',
  falla_reportada TEXT,
  evidencia JSONB, -- Array de URLs de fotos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE citas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehiculo_id UUID REFERENCES vehiculos(id),
  fecha_hora TIMESTAMP WITH TIME ZONE,
  descripcion_falla TEXT,
  estado VARCHAR(50) DEFAULT 'agendada',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
