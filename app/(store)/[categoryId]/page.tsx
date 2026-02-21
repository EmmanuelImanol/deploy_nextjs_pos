import { CategoryWithProductsResponseSchema } from "@/src/schemas"
import ProductCard from "@/components/products/ProductCard"
import { redirect } from "next/navigation"
import { HiOutlineTag } from "react-icons/hi2"

type Params = Promise<{categoryId: string}>

async function getProducts(categoryId: string) {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`
    const req = await fetch(url, {
        next: {
            tags: ['products-by-category']
        }
    })
    const json = await req.json()
    if(!req.ok) {
        redirect('/1')
    }
    const products = CategoryWithProductsResponseSchema.parse(json)
    return products
}

const StorePage = async ({params}: {params: Params}) => {
    const { categoryId } = await params;
    const category = await getProducts(categoryId)
    
    return (
        <div className="space-y-10">
            {/* Header de la Categoría */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-8">
                <div>
                    <div className="flex items-center gap-2 text-emerald-600 mb-2">
                        <HiOutlineTag className="text-xl" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Categoría</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter capitalize">
                        {category.name}
                    </h1>
                </div>

                <div className="flex items-center gap-3 bg-slate-100 px-5 py-2 rounded-2xl">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                        Productos:
                    </span>
                    <span className="text-slate-900 font-black text-lg">
                        {category.products.length}
                    </span>
                </div>
            </header>

            {/* Grid de Productos */}
            {category.products.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {category.products.map(product => (
                        <ProductCard 
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium text-lg italic">
                        No hay productos registrados en esta categoría aún.
                    </p>
                </div>
            )}
        </div>
    )
}

export default StorePage