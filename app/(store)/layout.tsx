import MainNav from "@/components/ui/MainNav";
import CartAside from "@/components/cart/CartAside";
import ToastNotification from "@/components/ui/ToastNotification";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      
      {/* Header con Blur y Borde Sutil */}
      <header className="shrink-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <MainNav />
      </header>

      <main className="flex flex-1 overflow-hidden">
        
        {/* Columna Principal: Área de Trabajo */}
        <div className="flex-1 overflow-y-auto relative 
             scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          
          {/* Contenedor con padding responsivo y max-width para escritorio */}
          <div className="max-w-400 mx-auto p-4 sm:p-6 lg:p-10 pb-32">
            
            {/* Animación de entrada suave */}
            <div className="transition-opacity duration-500 ease-in">
                {children}
            </div>
          </div>
        </div>

        {/* Aside del Carrito: Diseño Limpio y Minimalista */}
        <aside className="hidden xl:flex w-100 shrink-0 bg-white border-l border-slate-200 shadow-[-4px_0_20px_rgba(0,0,0,0.02)] flex-col">
           <div className="flex-1 overflow-y-auto scrollbar-none">
                <CartAside />
           </div>
        </aside>

      </main>

      {/* Notificaciones */}
      <ToastNotification />
    </div>
  );
}