import Link from "next/link";
import { ArrowRight, Calendar, Wrench, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center selection:bg-secondary/30">
      {/* Navbar Minimalista */}
      <nav className="w-full max-w-7xl px-6 py-6 flex justify-between items-center relative z-10">
        <div className="font-oswald font-bold text-2xl tracking-wider text-foreground">
          ADN<span className="text-primary">GARAGE</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link href="#servicios" className="hover:text-secondary transition-colors">Servicios</Link>
          <Link href="#nosotros" className="hover:text-secondary transition-colors">Taller</Link>
          <Link href="#contacto" className="hover:text-secondary transition-colors">Contacto</Link>
        </div>
        <Link 
          href="/login" 
          className="text-sm font-bold bg-[#1A1A1A]/80 border border-[#333] hover:border-secondary/50 px-5 py-2 rounded-md transition-all backdrop-blur-md"
        >
          Iniciar Sesión
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="w-full max-w-7xl px-6 flex flex-col items-center justify-center flex-1 text-center pt-20 pb-32 relative">
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
          Sistema de Gestión Premium
        </div>
        
        <h1 className="font-oswald text-6xl md:text-8xl tracking-tight uppercase text-foreground mb-6 leading-tight relative z-10">
          Revoluciona tu <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF4D4D] drop-shadow-[0_0_15px_rgba(254,0,26,0.4)]">
            Experiencia Automotriz
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 relative z-10 font-light">
          Agendamiento inteligente, diagnósticos transparentes y control total de tu vehículo en tiempo real. 
          Bienvenido a la nueva era del mantenimiento.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 relative z-10">
          <Link 
            href="/dashboard" 
            className="group relative px-8 py-4 bg-primary text-white font-bold rounded-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(254,0,26,0.3)] hover:shadow-[0_0_30px_rgba(254,0,26,0.5)]"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
            <span className="relative flex items-center justify-center gap-2 text-lg">
              Mis Vehículos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link 
            href="/registro" 
            className="px-8 py-4 border border-[#333] hover:border-secondary/60 text-foreground font-bold rounded-lg transition-all bg-[#1A1A1A]/30 backdrop-blur-md hover:bg-[#1A1A1A]/50 flex items-center justify-center text-lg"
          >
            Registrar Auto
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full relative z-10 text-left">
          {[
            {
              icon: <Calendar className="w-7 h-7 text-secondary" />,
              title: "Citas Dinámicas",
              desc: "Visualiza disponibilidad en tiempo real y reserva la bahía ideal."
            },
            {
              icon: <Wrench className="w-7 h-7 text-secondary" />,
              title: "Presupuestos Interactivos",
              desc: "Revisa fotos y aprueba o rechaza reparaciones desde tu celular."
            },
            {
              icon: <ShieldCheck className="w-7 h-7 text-secondary" />,
              title: "Transparencia Total",
              desc: "Seguimiento en cada etapa, con notificaciones y pagos online."
            }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-2xl bg-[#111111]/80 border border-[#222222] hover:border-secondary/40 transition-all duration-300 group backdrop-blur-xl hover:-translate-y-1"
            >
              <div className="mb-6 p-4 bg-[#1A1A1A] inline-block rounded-xl border border-[#333333] group-hover:border-secondary/30 transition-colors shadow-inner">
                {feature.icon}
              </div>
              <h3 className="font-oswald text-2xl text-foreground mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="w-full py-8 border-t border-[#222222] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ADN Garage. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="hover:text-secondary cursor-pointer transition-colors">Términos</span>
            <span className="hover:text-secondary cursor-pointer transition-colors">Privacidad</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
