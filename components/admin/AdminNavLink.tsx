"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminNavLinkProps {
    href: string
    children: React.ReactNode
}

export default function AdminNavLink({ href, children }: AdminNavLinkProps) {
    const pathname = usePathname()
    
    // Comprobamos si la ruta actual empieza con el href para mantenerlo activo 
    // incluso en subrutas (ej: /admin/products/new)
    const isActive = pathname.startsWith(href)

    return (
        <Link
            href={href}
            className={`${
                isActive 
                    ? "text-green-400" 
                    : "text-white hover:text-green-400"
            } font-bold p-2 transition-all duration-300`}
        >
            {children}
        </Link>
    )
}