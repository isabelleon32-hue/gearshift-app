"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Wrench } from "lucide-react";

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Registro del usuario en Auth y la metadata servirá para crear el perfil vía Trigger
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: nombre,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      // Auto-redirigir al dashboard o login después de 2 segundos si no requiere verificación de email
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-secondary/30">
      <div className="w-full max-w-md bg-[#1A1A1A] p-8 rounded-2xl border border-[#333] shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-secondary/10 rounded-full border border-secondary/30">
            <Wrench className="w-8 h-8 text-secondary" />
          </div>
        </div>
        <h1 className="text-3xl font-oswald text-center text-foreground mb-2">CREAR CUENTA</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Únete a ADN Garage</p>

        {error && (
          <div className="bg-primary/20 border border-primary text-primary p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-500/20 border border-green-500 text-green-400 p-6 rounded-lg text-center">
            ¡Registro exitoso! Redirigiendo al sistema...
          </div>
        ) : (
          <form onSubmit={handleRegistro} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-secondary transition-colors"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-secondary transition-colors"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-secondary transition-colors"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-lg transition-all mt-2 disabled:opacity-50"
            >
              {loading ? "Creando cuenta..." : "Registrarme"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-500 mt-6 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-secondary hover:text-white transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
