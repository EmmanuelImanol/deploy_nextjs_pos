"use client"
import { useState } from "react";
import Link from "next/link";
import { Category } from "@/src/schemas"; // Ajusta según tu tipo de TS

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Botón Hamburguesa */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 focus:outline-none"
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="absolute top-17.5 left-0 w-full bg-gray-800 border-t border-gray-600 z-50 shadow-xl">
          <nav className="flex flex-col p-4">
            {categories.map(category => (
              <Link 
                key={category.id}
                href={`/${category.id}`}
                onClick={() => setIsOpen(false)}
                className="text-white py-3 border-b border-gray-700 last:border-none font-bold"
              >
                {category.name}
              </Link>
            ))}

            <Link
              href={'/admin/sales'}
              className="rounded bg-green-400 font-bold py-2 px-5 text-white text-center"
            >Admin</Link>
          </nav>
        </div>
      )}
    </div>
  );
}