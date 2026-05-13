import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UploadEvidencia from "@/components/UploadEvidencia";

export default async function MecanicoDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verificación de seguridad
  const { data: perfil } = await supabase
    .from("perfiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (perfil?.rol !== "mecanico") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-oswald text-secondary mb-2">Taller Mecánico</h1>
        <p className="text-gray-400 mb-8">Gestión de Tareas y Evidencias</p>

        <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Mis Tareas Asignadas</h2>
          <div className="bg-[#111] p-4 rounded-lg border border-[#222]">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold text-white">Cambio de Aceite y Filtros</p>
                <p className="text-sm text-gray-500">Vehículo: Toyota Corolla - PAT-123</p>
              </div>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                En Progreso
              </span>
            </div>
            
            <div className="mt-6 border-t border-[#333] pt-6">
              <h3 className="text-md font-bold mb-3 text-secondary">Subir Evidencia (Fotos/Video)</h3>
              <p className="text-xs text-gray-400 mb-4">Las evidencias se adjuntarán a la Orden de Trabajo actual. El cliente podrá verlas al momento de aprobar el presupuesto.</p>
              
              <UploadEvidencia ordenId="placeholder-orden-id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
