"use client"
import { useState } from "react"
import Link from "next/link"

export default function AdminMobileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 focus:outline-none"
                aria-label="Abrir menú de administración"
            >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    )}
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-gray-800 border-t border-gray-600 z-50 shadow-xl">
                    <nav className="flex flex-col p-4 space-y-2">
                        <Link
                            href="/admin/products"
                            onClick={() => setIsOpen(false)}
                            className="text-white py-3 border-b border-gray-700 font-bold"
                        >
                            Productos
                        </Link>
                        <Link
                            href="/admin/sales"
                            onClick={() => setIsOpen(false)}
                            className="text-white py-3 border-b border-gray-700 font-bold"
                        >
                            Ventas
                        </Link>
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="bg-green-400 text-black py-3 px-5 rounded font-bold text-center mt-2"
                        >
                            Ir a la Tienda
                        </Link>
                    </nav>
                </div>
            )}
        </div>
    )
}