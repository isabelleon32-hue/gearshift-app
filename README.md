PARTE 1: ESTRUCTURA FRONTEND
1. ARQUITECTURA VISUAL Y NAVEGACIÓN
1.1 Mapa de Navegación
Plaintext
[PÚBLICO]
Inicio ➔ Registro/Login

[CLIENTE AUTENTICADO]
Dashboard Mis Autos ➔ Registro de Vehículo ➔ Agendamiento (Calendario) ➔ Detalle de Orden Activa ➔ Aprobación de Presupuesto ➔ Pago/Check-out

[ADMINISTRADOR / SECRETARÍA]
Panel de Control ➔ Gestión de Bahías ➔ Creación de Órdenes ➔ Carga de Evidencia (Fotos) ➔ Validación de Pagos
1.2 Pantallas Principales
Pantalla: Dashboard "Mis Autos" (Cliente)
Propósito: Vista central de los activos del cliente.

Acceso: Login de Usuario.

Elementos Visuales:

Lista de vehículos registrados (Card con Marca, Modelo, Patente).

Estado de mantenimiento preventivo (indicador visual).

Acceso rápido a "Agendar Cita" para cada auto.

Interacciones del Usuario:

Clic en auto para ver historial.

Clic en "Nueva Cita" para ir al calendario.

Pantalla: Diagnóstico e Interacción (Cliente)
Propósito: Aprobar/Rechazar servicios basados en evidencia.

Elementos Visuales:

Galería de fotos (las 5 fotos subidas por el taller).

Tabla de presupuesto con desglose de: Repuestos (Taller/Cliente) y Mano de Obra.

Botones de selección por ítem (Aceptar/Rechazar).

Interacciones del Usuario: El usuario selecciona qué trabajos realizar. Si acepta todo, el valor del "Diagnóstico" se descuenta automáticamente a $0.

2. SISTEMA DE DISEÑO (Premium Dark)
2.1 Paleta de Colores
Primario: #FF6D00 (Naranja Eléctrico) - Botones de acción, estados activos.

Secundario: #1A1A1A (Negro Carbono) - Fondos de tarjetas y menús.

Fondo: #0A0A0A (Negro Puro) - Fondo general.

Estados: Éxito: #00E676, Error: #FF1744, Advertencia: #FFEA00.

2.2 Tipografía
Fuente Principal: Oswald (Bold) - Títulos y KPIs.

Cuerpo: Inter (Regular/Medium) - Datos técnicos y descripciones.

3. ESPECIFICACIONES TÉCNICAS FRONTEND
Framework: Next.js 15 (React). Elegido por su velocidad de carga y optimización SEO/Mobile.

Styling: Tailwind CSS. Permite crear la estética Premium Dark de forma rápida y responsiva.

State Management: Zustand. Ligero para manejar el estado del presupuesto y los datos del vehículo.

Forms: React Hook Form + Zod. Para validaciones estrictas de patentes y números de teléfono.

PARTE 2: ESTRUCTURA BACKEND
1. ARQUITECTURA DEL SISTEMA
1.1 Patrón Arquitectónico
Se utilizará una Arquitectura en Capas (Layered Architecture) con soporte Multi-tenant.

Estructura: Cliente ➔ Middleware (Auth/Tenant) ➔ Controllers ➔ Services ➔ Repositories ➔ Database (PostgreSQL).

1.2 Diagrama de Arquitectura
Plaintext
[Frontend (Vercel)] ➔ [API Gateway / Auth (JWT)] ➔ [Service Layer (Lógica de Negocio)] ➔ [PostgreSQL (Supabase)]
                                             ➔ [Cloudinary (Fotos)]
                                             ➔ [Twilio/WhatsApp API]
2. API REST - ENDPOINTS POR RECURSO
Recurso: Vehículos
GET /api/v1/vehiculos: Lista autos del cliente.

POST /api/v1/vehiculos: Registra un nuevo vehículo (Patente, Marca, Modelo, Año, Color).

Recurso: Citas / Bahías
GET /api/v1/citas/disponibilidad: Consulta plazas libres en elevadores.

POST /api/v1/citas: Crea agendamiento vinculando vehículo y descripción de falla.

Recurso: Órdenes de Trabajo (OT)
PATCH /api/v1/ordenes/:id/evidencia: (Admin) Sube las 5 fotos.

POST /api/v1/ordenes/:id/presupuesto: (Admin) Envía el presupuesto detallado.

PATCH /api/v1/ordenes/:id/cliente-aprobacion: (Cliente) Acepta/Rechaza ítems.

3. MODELO DE DATOS (Base de Datos)
3.1 Base de Datos Recomendada: PostgreSQL
Justificación: Necesitamos integridad referencial para asegurar que un presupuesto nunca se pierda y que las bahías no se dupliquen.

3.2 Tablas Principales
Tabla: bahias_elevadores
SQL
CREATE TABLE bahias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  taller_id UUID, -- Soporte Multi-tenant
  nombre VARCHAR(50), -- Ej: "Elevador 1"
  estado ENUM('disponible', 'ocupada', 'mantenimiento')
);
Tabla: presupuestos
SQL
CREATE TABLE presupuestos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  orden_id UUID,
  items JSONB, -- [{desc: 'Pastillas', precio: 50000, aceptado: null}]
  valor_diagnostico DECIMAL,
  descuento_diagnostico_aplicado BOOLEAN DEFAULT FALSE
);
4. LÓGICA DE NEGOCIO (Reglas de Oro)
Regla del Diagnóstico: Si el cliente marca aceptado: true en los ítems de reparación, el sistema debe restar automáticamente el valor_diagnostico del total final.

Privacidad GPS: El rastreo de la grúa/chofer solo se emite mientras el estado del pedido sea RECOGIENDO_VEHICULO. Al llegar al taller, la conexión socket se corta.

Notificación Final: Al cambiar el estado a LISTO_PARA_ENTREGA, el servidor dispara simultáneamente un correo (SendGrid) y un mensaje de WhatsApp (Twilio) con el link de pago/factura.

5. SEGURIDAD
Autenticación: JWT con Refresh Tokens.

Pago Móvil (Venezuela): Los clientes suben el pantallazo (screenshot). El Admin lo ve en el panel y presiona "Verificar" para liberar el vehículo en sistema.

Validación: No se puede entregar un auto si el saldo en la base de datos no es 0.00 o si el Admin no ha marcado "Pago Presencial Recibido".

INSTRUCCIONES PARA GITHUB:
Crea un repositorio privado en GitHub.

Crea un archivo llamado README.md.

Copia y pega el contenido de arriba en ese archivo.

Crea la carpeta /docs y guarda este plan ahí.
