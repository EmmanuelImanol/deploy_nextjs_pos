import { Product } from "@/src/schemas"
import { revalidatePath } from "next/cache"

const DeleteProductForm = ({productId}: {productId: Product['id']}) => {

    const handleDelete = async () => {
        "use server"
        // Handle delete logic here
        const url = `${process.env.API_URL}/products/${productId}`
        const req = await fetch(url, {
            method: 'DELETE'
        })
        await req.json()
        revalidatePath('/admin/products')
    }
    return (
        <form
            action={handleDelete}
        >
            <input
                type="submit"
                className="text-red-600 hover:text-red-800 cursor-pointer"
                value={'Eliminar'}
            />
        </form>
    )
}
export default DeleteProductForm