import Link from "next/link";

type PaginationProps = {
    page: number;
    totalPages: number;
    baseUrl: string;
}

const Pagination = ({ page, totalPages, baseUrl }: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    // Clases base para los botones
    const baseClass = "px-4 py-2 text-sm font-medium transition-colors border";
    const inactiveClass = "bg-white border-gray-300 text-gray-500 hover:bg-gray-50";
    const activeClass = "z-10 bg-indigo-600 border-indigo-600 text-white";
    return (
        <nav className="flex items-center justify-center -space-x-px py-10" aria-label="Paginación">
            {/* Botón Anterior */}
            {page > 1 && (
                <Link
                    href={`${baseUrl}?page=${page - 1}`}
                    className={`${baseClass} ${inactiveClass} rounded-l-md`}
                >
                    &larr; <span className="hidden sm:inline ml-1">Anterior</span>
                </Link>
            )}

            {/* Números de Página */}
            <div className="hidden md:flex">
                {pages.map(currentPage => (
                    <Link
                        key={currentPage}
                        href={`${baseUrl}?page=${currentPage}`}
                        className={`${baseClass} ${currentPage === page ? activeClass : inactiveClass}`}
                    >
                        {currentPage}
                    </Link>
                ))}
            </div>

            {/* Indicador de página en móvil */}
            <div className="flex md:hidden px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-bold">
                Pág. {page} de {totalPages}
            </div>

            {/* Botón Siguiente */}
            {page < totalPages && (
                <Link
                    href={`${baseUrl}?page=${page + 1}`}
                    className={`${baseClass} ${inactiveClass} rounded-r-md`}
                >
                    <span className="hidden sm:inline mr-1">Siguiente</span> &rarr;
                </Link>
            )}
        </nav>
    )
}
export default Pagination