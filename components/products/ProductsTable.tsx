import { Product } from "@/src/schemas"
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils"
import Image from "next/image"
import Link from "next/link"
import DeleteProductForm from "./DeleteProductForm"

export default function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-4 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:pl-6">
                      Imagen
                    </th>
                    <th scope="col" className="py-4 px-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Producto
                    </th>
                    <th scope="col" className="py-4 px-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Precio
                    </th>
                    <th scope="col" className="py-4 px-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Inventario
                    </th>
                    <th scope="col" className="relative py-4 pl-3 pr-4 sm:pr-6 text-right">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                        <div className="h-20 w-20 shrink-0">
                          <Image
                            src={getImagePath(product.image)}
                            alt={`Imagen del Producto ${product.name}`}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover shadow-sm border border-gray-100"
                            priority
                          />
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <div className="font-bold text-gray-900">{product.name}</div>
                        <div className="text-gray-500 text-xs">ID: {product.id}</div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-700 font-medium">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-3 py-4 text-sm">
                        {isAvailable(product.inventory) ? (
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {product.inventory} unidades
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 uppercase">
                            Agotado
                          </span>
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className='flex gap-4 justify-end items-center'>
                          <Link
                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md transition-colors"
                            href={`/admin/products/${product.id}/edit`}
                          >
                            Editar
                          </Link>

                          <DeleteProductForm
                            productId={product.id}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}