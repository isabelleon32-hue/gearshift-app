import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ShieldCheck, Calendar } from "lucide-react";

export default async function ClienteDashboard() {
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

  if (perfil?.rol && perfil.rol !== "cliente") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-oswald text-foreground mb-8">Mis Vehículos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card de Vehículo Placeholder */}
          <div className="bg-[#1A1A1A] border border-[#333] hover:border-secondary/50 transition-colors rounded-xl p-6 group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-secondary transition-colors">Honda Civic 2022</h2>
                <p className="text-gray-400 font-mono">ABC-123</p>
              </div>
              <span className="bg-green-500/10 border border-green-500/30 text-green-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
                Al Día
              </span>
            </div>
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-secondary text-white font-bold py-2 rounded-lg hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Agendar Cita
              </button>
              <button className="px-4 border border-[#444] text-gray-300 font-bold py-2 rounded-lg hover:bg-[#333] transition-colors flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Historial
              </button>
            </div>
          </div>
          
          {/* Añadir Vehículo */}
          <div className="bg-[#111] border-2 border-dashed border-[#333] hover:border-secondary/50 transition-colors rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer min-h-[200px]">
            <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center mb-3 text-2xl text-gray-400">
              +
            </div>
            <p className="text-gray-400 font-bold">Registrar Nuevo Vehículo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
