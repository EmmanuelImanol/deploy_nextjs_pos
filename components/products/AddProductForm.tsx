"use client"
import { useActionState, useEffect } from "react"
import { addProduct } from "@/actions/add-product-action"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const AddProductForm = ({children} : {children: React.ReactNode}) => {
    const router = useRouter()
    const [state, dispatch] = useActionState(addProduct, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if(state.success) {
            toast.success(state.success)
            router.push('/admin/products')
        }
    }, [state])
    return (
        <form
            action={dispatch}
            className="space-y-5"
        >
            {children}
            <input 
                type="submit"
                className="rounded bg-green-400 font-bold py-2 w-full hover:text-white transition hover:bg-green-500 cursor-pointer"
                value={'Agregar producto'}
            />
        </form>
    )
}
export default AddProductForm