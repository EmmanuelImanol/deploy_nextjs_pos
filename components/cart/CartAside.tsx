"use client";

import { useUI } from "@/context/UIContext";
import ShoppingCart from "./ShoppingCart";

export default function CartAside() {
  const { isCartOpen, closeCart } = useUI();

  return (
    <>
      {/* Overlay: Fondo oscuro para cuando el carrito está abierto */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-90 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Panel del Carrito: Siempre FIXED para no empujar el contenido */}
      <aside className={`
        fixed inset-y-0 right-0 z-100 bg-white shadow-2xl 
        transform transition-transform duration-300 ease-in-out
        w-full max-w-sm lg:w-96
        /* Si está abierto se muestra, si no, se esconde a la derecha */
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="text-xl font-bold text-gray-800">Tu Carrito</h2>
            <button 
              onClick={closeCart} 
              className="p-2 text-gray-500 text-3xl hover:text-red-500 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Aquí se renderizan tus productos */}
          <div className="flex-1 overflow-y-auto p-5">
            <ShoppingCart />
          </div>
        </div>
      </aside>
    </>
  );
}