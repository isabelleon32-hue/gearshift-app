"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-secondary/30">
      <div className="w-full max-w-md bg-[#1A1A1A] p-8 rounded-2xl border border-[#333] shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-secondary/10 rounded-full border border-secondary/30">
            <ShieldCheck className="w-8 h-8 text-secondary" />
          </div>
        </div>
        <h1 className="text-3xl font-oswald text-center text-foreground mb-2">INICIAR SESIÓN</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Ingresa a tu cuenta de ADN Garage</p>

        {error && (
          <div className="bg-primary/20 border border-primary text-primary p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-lg transition-all mt-2 disabled:opacity-50"
          >
            {loading ? "Iniciando..." : "Entrar al Sistema"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="/registro" className="text-secondary hover:text-white transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
