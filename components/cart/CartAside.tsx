"use client";

import { useUI } from "@/context/UIContext";
import ShoppingCart from "./ShoppingCart";

export default function CartAside() {
  const { isCartOpen, closeCart } = useUI();

  return (
    <>
      {/* Overlay para móvil */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-55 lg:hidden backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Aside con lógica de apertura */}
      <aside className={`
        fixed inset-y-0 right-0 z-60 w-full max-w-sm bg-white shadow-2xl 
        transform transition-transform duration-300 ease-in-out
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:z-0 lg:relative lg:translate-x-0 lg:w-96 lg:h-full lg:shadow-none lg:flex lg:flex-col
      `}>
        <div className="flex flex-col p-5 overflow-y-auto h-full">
          <div className="flex justify-between items-center lg:hidden mb-2">
            <h2 className="text-xl font-bold">Tu Carrito</h2>
            <button onClick={closeCart} className="p-2 text-gray-500 text-2xl hover:cursor-pointer">×</button>
          </div>
          <ShoppingCart />
        </div>
      </aside>
    </>
  );
}