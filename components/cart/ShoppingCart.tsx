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
    <>
      {contents.length ? (
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-center text-gray-900">Resumen de Venta</h2>
          <ul role="list" className="mt-2 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500 overflow-y-auto max-h-96">
            {contents.map(item => (
              <ShoppingCartItem 
                key={item.productId}
                item={item}
              />
            ))}
          </ul>
          <dl className="space-y-2 border-t border-gray-300 py-3 text-sm font-medium text-gray-900">
            {discount > 0 && (
              <Amount
                label={'Descuento'}
                amount={discount}
                discount={true}
              />
            )}
            <Amount 
              label={'Total a Pagar'}
              amount={total}
            />
          </dl>

          <CouponForm />
          <SubmitOrderForm />
        </div>
      ) : (
        <p className="text-xl text-center text-gray-900">El carrito está vacio</p>
      )}
    </>
  )
}
export default ShoppingCart