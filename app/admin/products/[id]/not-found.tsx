import Heading from "@/components/ui/Heading"
import Link from "next/link"

const NotFound = () => {
    return (
        <div className="text-center py-10">
            <Heading>Producto no encontrado</Heading>
            <p className="text-gray-600">El producto que estás buscando no existe o ha sido eliminado.</p>
            <p>
                Tal vez quieras {""}
                <Link 
                    href="/admin/products" 
                    className="text-green-500 font-bold hover:underline"
                >volver a la lista de productos</Link>.
            </p>
        </div>
    )
}
export default NotFound