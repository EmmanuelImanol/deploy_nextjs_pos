import AdminNav from "@/components/ui/AdminNav";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
        <AdminNav />
        
        {/* Main: Ajustamos paddings para que en móvil respire */}
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          
          {/* Card Principal: 
              - En móvil: quitamos bordes redondeados y sombras pesadas si quieres aprovechar el ancho (opcional)
              - p-5 en móvil, p-10 en escritorio
          */}
          <div className="bg-white shadow-sm border border-slate-100 rounded-3xl w-full mx-auto p-5 sm:p-8 lg:p-12" >
            {children}
          </div>
          
        </main>

        <ToastNotification />
    </div>
  );
}