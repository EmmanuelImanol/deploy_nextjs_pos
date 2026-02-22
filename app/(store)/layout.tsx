import MainNav from "@/components/ui/MainNav";
import ToastNotification from "@/components/ui/ToastNotification";
import ShoppingCart from "@/components/cart/ShoppingCart";
import CartAside from "@/components/cart/CartAside";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNav />
      <main className="lg:flex lg:h-screen lg:overflow-y-hidden">
        {/* Contenido principal (Lista de productos) */}
        <div className="lg:w-2/3 xl:w-3/4 2xl:w-4/5 lg:h-screen lg:overflow-y-auto p-4">
          {children}
        </div>

        {/* Carrito Lateral (Solo visible en Desktop >= 1024px) */}
        <aside className="hidden lg:block lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-white border-l shadow-lg h-full overflow-y-auto">
          <ShoppingCart />
        </aside>
      </main>

      {/* El CartAside que ya tienes se encargará del móvil automáticamente */}
      <CartAside /> 
      
      <ToastNotification />
    </>
  );
}