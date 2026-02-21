import AddProductForm from "@/components/products/AddProductForm"
import ProductForm from "@/components/products/ProductForm"
import Heading from "@/components/ui/Heading"
import Link from "next/link"


const NewProductPage = () => {
    return (
        <>
            <Link
                href={`/admin/products`}
                className="rounded bg-green-400 font-bold py-2 px-5 hover:text-white transition hover:bg-green-500"
            >Volver</Link>
            <Heading>Nuevo Producto</Heading>

            <AddProductForm>
                <ProductForm />
            </AddProductForm>
        </>
    )
}
export default NewProductPage