"use client"

import { Product } from "@/src/schemas"
import { useStore } from "@/src/store"
import { HiPlus } from "react-icons/hi2"

const AddProductButton = ({product}: {product: Product}) => {
    const addToCart = useStore(state => state.addToCart)

    return (
        <button
            type="button"
            className="group relative flex items-center justify-center transition-all duration-200 active:scale-95"
            onClick={() => addToCart(product)}
            aria-label={`Agregar ${product.name} al carrito`}
        >
            {/* Fondo con efecto de expansión (Glow) al hacer hover */}
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
            
            {/* Círculo Principal */}
            <div className="relative flex items-center justify-center w-10 h-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-200 transition-colors">
                <HiPlus className="w-6 h-6 stroke-2 transition-transform duration-300 group-hover:rotate-90" />
            </div>

            {/* Tooltip opcional para escritorio */}
            <span className="absolute -bottom-8 scale-0 transition-all rounded bg-slate-800 p-1 text-[10px] font-bold text-white group-hover:scale-100">
                Añadir
            </span>
        </button>
    )
}

export default AddProductButton