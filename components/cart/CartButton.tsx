"use client"
import { useUI } from "@/context/UIContext"
import { useStore } from "@/src/store" 

export default function CartButton() {
  const { openCart } = useUI()
  // Accedemos a contents desde tu store
  const contents = useStore(state => state.contents)

  // Calculamos la suma de todas las cantidades
  const totalItems = contents.reduce((total, item) => total + item.quantity, 0)

  return (
    <button 
      onClick={openCart} 
      className="relative p-2 text-white hover:bg-gray-600 rounded-full transition-colors hover:cursor-pointer"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-8 h-8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>

      {/* Indicador visual */}
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-gray-700 animate-in fade-in zoom-in duration-300">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  )
}