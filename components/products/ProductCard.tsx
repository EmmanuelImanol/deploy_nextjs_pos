import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";
import { HiOutlineArchiveBox } from "react-icons/hi2";

export default function ProductCard({product}: {product: Product}) {
    const available = isAvailable(product.inventory);

    return (
        <div className='group relative bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 flex flex-col h-full'>
            
            {/* Contenedor de Imagen */}
            <div className={`relative aspect-square overflow-hidden bg-slate-50 ${!available && 'grayscale opacity-60'}`}>
                <Image 
                    src={getImagePath(product.image)}
                    alt={`Imagen de producto ${product.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                />
                
                {/* Badge de Inventario Bajo (Opcional) */}
                {available && product.inventory <= 5 && (
                    <span className="absolute top-4 right-4 bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                        Últimas {product.inventory} unidades
                    </span>
                )}
            </div>

            {/* Información del Producto */}
            <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-slate-400">
                        <HiOutlineArchiveBox className="text-sm" />
                        <p className="text-xs font-bold uppercase tracking-widest">
                            Stock: <span className={available ? 'text-slate-600' : 'text-rose-500'}>
                                {product.inventory}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">
                        {formatCurrency(product.price)}
                    </p>
                    
                    {available && (
                        <div className="scale-90 origin-right">
                             <AddProductButton product={product} />
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay de Agotado */}
            {!available && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
                    <div className="bg-white px-8 py-4 rounded-2xl shadow-2xl transform rotate-3 border-b-4 border-slate-300">
                        <p className="text-slate-900 text-xl font-black uppercase tracking-tighter italic">Agotado</p>
                    </div>
                </div>
            )}
        </div>
    )
}