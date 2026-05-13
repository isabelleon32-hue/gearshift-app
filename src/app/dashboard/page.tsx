import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardRoot() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Obtenemos el perfil del usuario para ver su rol
  const { data: perfil } = await supabase
    .from("perfiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  const rol = perfil?.rol || "cliente";

  if (rol === "admin") {
    redirect("/dashboard/admin");
  } else if (rol === "mecanico") {
    redirect("/dashboard/mecanico");
  } else {
    redirect("/dashboard/cliente");
  }
}
