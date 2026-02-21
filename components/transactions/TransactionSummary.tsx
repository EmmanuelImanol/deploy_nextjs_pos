import { Transaction } from "@/src/schemas"
import { formatCurrency, getImagePath } from "@/src/utils"
import Image from "next/image"
import { HiOutlineHashtag } from "react-icons/hi"
import { MdOutlineReceiptLong } from "react-icons/md"

export default function TransactionSummary({ transaction }: { transaction: Transaction }) {

  return (
    <div className='bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden mb-6 hover:shadow-md transition-all'>
      
      {/* Cabecera: Gris Oscuro */}
      <div className='bg-slate-800 px-6 py-4 flex justify-between items-center'>
        <div className="flex items-center gap-2 text-slate-300">
          <HiOutlineHashtag className="text-green-400" />
          <span className="text-xs font-black uppercase tracking-[0.15em]">Folio: {transaction.id}</span>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 text-[10px] font-black uppercase">Venta Finalizada</span>
        </div>
      </div>

      {/* Lista de Productos */}
      <ul role="list" className="divide-y divide-slate-100">
        {transaction.contents.map((item) => (
          <li key={item.id} className="p-5 sm:p-6 group hover:bg-slate-50/50 transition-colors">
            <div className='flex items-center gap-4 sm:gap-6'>
              {/* Imagen con borde gris suave */}
              <div className='relative w-20 h-20 shrink-0 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner'>
                <Image
                  src={getImagePath(item.product.image)}
                  alt={`Imagen de producto ${item.product.name}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>

              {/* Información del Producto */}
              <div className="flex-auto space-y-1">
                <h3 className="text-slate-800 font-bold text-base sm:text-lg leading-tight">
                    {item.product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <p className="text-green-600 font-black text-lg">
                    {formatCurrency(+item.price)}
                  </p>
                  <span className="text-slate-300">/</span>
                  <p className="text-slate-500 text-sm font-medium">
                    Cant: <span className="text-slate-900 font-bold">{item.quantity}</span>
                  </p>
                </div>
              </div>

              {/* Subtotal vertical en gris oscuro */}
              <div className="text-right hidden xs:block">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Subtotal</p>
                <p className="text-slate-800 font-black text-base">
                    {formatCurrency(+item.price * item.quantity)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer: Desglose y Total con Verde Intenso */}
      <div className="bg-slate-50 p-6 border-t border-slate-100">
        <div className="space-y-3">
            {transaction.coupon && (
                <div className="flex justify-between items-center text-sm pb-3 border-b border-slate-200 border-dashed">
                    <span className="text-slate-500 font-medium flex items-center gap-2">
                        <MdOutlineReceiptLong className="text-green-500" />
                        Descuento ({transaction.coupon})
                    </span>
                    <span className="text-green-600 font-bold">-{formatCurrency(+transaction.discount!)}</span>
                </div>
            )}
            
            <div className="flex justify-between items-center pt-1">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Total de Venta</span>
                    <span className="text-slate-900 font-medium text-xs">IVA incluido</span>
                </div>
                <dd className="text-3xl font-black text-slate-800 tracking-tighter">
                    {formatCurrency(+transaction.total)}
                </dd>
            </div>
        </div>
      </div>
    </div>
  )
}