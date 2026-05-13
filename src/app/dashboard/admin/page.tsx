import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verificación de seguridad: Asegurarse de que el usuario es Admin
  const { data: perfil } = await supabase
    .from("perfiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (perfil?.rol !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-oswald text-primary mb-6">Panel de Administración</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Órdenes Activas</h2>
            <p className="text-3xl text-secondary font-oswald">12</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Ingresos del Día</h2>
            <p className="text-3xl text-secondary font-oswald">$1,250.00</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Clientes</h2>
            <p className="text-3xl text-secondary font-oswald">145</p>
          </div>
        </div>
      </div>
    </div>
  );
}
