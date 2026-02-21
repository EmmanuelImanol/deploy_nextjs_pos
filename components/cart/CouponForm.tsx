import { FormEvent } from "react"
import { useStore } from "@/src/store"

export default function CouponForm() {
    const applyCoupon = useStore(state => state.applyCoupon)
    const coupon = useStore(state => state.coupon)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const couponName= formData.get('coupon_name')?.toString()
        if(!couponName) return
        await applyCoupon(couponName)
    }

    return (
        <>
            <p className="py-2 font-bold border-t border-gray-300">Canjear Cupón</p>
            <form
                className="flex"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className="px-2 bg-gray-200 border-gray-300 w-full"
                    placeholder="Ingresa un cupón"
                    name="coupon_name"
                />
                <input
                    type="submit"
                    className="p-2 bg-green-400 font-bold hover:cursor-pointer"
                    value='Canjear'
                />
            </form>
            {coupon.message && (
                <p className={`pt-2 text-center text-sm font-bold ${coupon.percentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coupon.message}
                </p>
            )}
        </>
    )
}