// components/ui/MainNav.tsx
import { CategoriesResponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";
import CartButton from "../cart/CartButton";
import MobileMenu from "./MobileMenu";

async function getCategories() {
  const url = `${process.env.API_URL}/categories`
  const req = await fetch(url)
  const json = await req.json()
  return CategoriesResponseSchema.parse(json)
}

export default async function MainNav() {
  const categories = await getCategories()

  return (
    <header className="relative px-5 md:px-10 py-4 bg-gray-700 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Lado Izquierdo: Menú Móvil (solo visible en sm/md) */}
        <div className="flex-1 md:hidden">
          <MobileMenu categories={categories} />
        </div>

        {/* Centro: Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Centro-Derecha: Navegación Desktop (Oculta en móvil) */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <nav className="hidden md:flex gap-6 items-center">
            {categories.map(category => (
              <Link 
                key={category.id}
                href={`/${category.id}`}
                className="text-white hover:text-green-400 font-bold transition-colors"
              >
                {category.name}
              </Link>
            ))}

            <Link
              href={'/admin/sales'}
              className="rounded bg-green-400 font-bold py-2 px-5 text-white"
            >Admin</Link>
          </nav>
        </div>

        {/* Lado Derecho: Botón Carrito */}
        <div className="flex items-center lg:hidden relative z-50">
          <CartButton />
        </div>
      </div>
    </header>
  )
}