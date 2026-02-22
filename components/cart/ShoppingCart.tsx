"use client"

import { useStore } from "@/src/store"
import ShoppingCartItem from "./ShoppingCartItem"
import Amount from "./Amount"
import CouponForm from "./CouponForm"
import SubmitOrderForm from "./SubmitOrderForm"

const ShoppingCart = () => {
  const contents = useStore(state => state.contents)
  const total = useStore(state => state.total)
  const discount = useStore(state => state.discount)

  return (
    <div className="h-full flex flex-col bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
      {/* Header del Carrito */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {contents.length}
          </span>
          Resumen de Venta
        </h2>
      </div>

      {contents.length ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Lista de productos con scroll independiente */}
          <ul 
            role="list" 
            className="flex-1 overflow-y-auto px-4 divide-y divide-gray-100"
          >
            {contents.map(item => (
              <ShoppingCartItem 
                key={item.productId}
                item={item}
              />
            ))}
          </ul>

          {/* Sección de Totales y Formularios */}
          <div className="bg-gray-50 p-6 space-y-4 border-t border-gray-200">
            
            <dl className="space-y-3">
              {discount > 0 && (
                <div className="flex justify-between items-center text-emerald-600">
                  {/* Mantenemos tus props originales: label y amount */}
                  <Amount
                    label={'Descuento'}
                    amount={discount}
                    discount={true}
                  />
                </div>
              )}
              
              <div className="pt-3 border-t border-gray-200">
                <div className="text-lg font-black text-gray-900">
                  {/* Mantenemos tus props originales: label y amount */}
                  <Amount 
                    label={'Total a Pagar'}
                    amount={total}
                  />
                </div>
              </div>
            </dl>

            {/* Espacio para Cupón y Botón de Envío */}
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-dashed border-gray-300">
                <CouponForm />
              </div>
              
              <div className="pt-2">
                <SubmitOrderForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center bg-gray-50/50">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
             <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
             </svg>
          </div>
          <p className="text-gray-500 font-medium">El carrito está vacío</p>
        </div>
      )}
    </div>
  )
}

export default ShoppingCart