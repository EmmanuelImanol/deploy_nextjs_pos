import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import AdminMobileMenu from './AdminMobileMenu'
import AdminNavLink from '../admin/AdminNavLink'

export default function AdminNav() {
  return (
    <header className="sticky top-0 z-50 px-5 md:px-10 py-5 bg-gray-700 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-5">
          {/* Menú de hamburguesa para móvil */}
          <AdminMobileMenu />
          
          <div className="text-white">
            <Logo />
          </div>
        </div>

        {/* Navegación para escritorio */}
        <nav className="hidden md:flex gap-6 items-center">
            <AdminNavLink href="/admin/products">
              Productos
            </AdminNavLink>

            <AdminNavLink href="/admin/sales">
              Ventas
            </AdminNavLink>

            <Link
                href={'/'}
                className="rounded bg-green-400 font-bold py-2 px-5 hover:text-white transition hover:bg-green-500 text-black"
            >
              Tienda
            </Link>
        </nav>
    </header>
  )
}