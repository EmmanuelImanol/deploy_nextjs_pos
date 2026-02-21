"use client"

import { useState } from "react"
import Calendar from "react-calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useQuery } from "@tanstack/react-query"
import { getSalesByDate } from "@/src/api"
import TransactionSummary from "./TransactionSummary"
import { formatCurrency } from "@/src/utils"

// Iconos de react-icons
import { FaRegCalendarAlt, FaChevronRight } from "react-icons/fa"
import { HiOutlineDocumentSearch } from "react-icons/hi"
import { MdOutlineAccountBalanceWallet } from "react-icons/md"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const TransactionFilter = () => {
    const [date, setDate] = useState<Value>(new Date())

    const formattedDate = format(date as Date, "yyyy-MM-dd")
    const { data, isLoading } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate),
    })

    const total = data?.reduce((total, transaction) => total + +transaction.total, 0) ?? 0

    return (
        <div className="max-w-300 mx-auto p-4 md:p-8 space-y-8 min-h-screen font-sans text-slate-900">
            
            {/* --- HEADER --- */}
            <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-8 gap-6">
                <div>
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                        <FaRegCalendarAlt className="text-lg" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Corte de Caja Diario</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter capitalize">
                        {format(date as Date, "EEEE dd, MMM", { locale: es })}
                    </h1>
                </div>

                <div className="bg-green-600 text-white px-8 py-6 rounded-[2.5rem] shadow-xl shadow-green-100 flex items-center gap-6 border-b-4 border-green-700">
                    <div className="bg-white/20 p-3 rounded-2xl">
                        <MdOutlineAccountBalanceWallet size={35} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-green-100 tracking-[0.2em] mb-1">Venta Total</p>
                        <p className="text-4xl font-black tracking-tighter">
                            {formatCurrency(total)}
                        </p>
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Lateral: Calendario Minimalista green/Slate */}
                <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-10">
                    <div className="bg-white p-6 md:p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
                        <Calendar 
                            value={date}
                            onChange={setDate}
                            locale="es"
                            prev2Label={null}
                            next2Label={null}
                            className="w-full! border-none! font-sans!
                                [&_.react-calendar__navigation]:flex 
                                [&_.react-calendar__navigation]:h-12 
                                [&_.react-calendar__navigation]:mb-6
                                [&_.react-calendar__navigation_button]:text-slate-800 
                                [&_.react-calendar__navigation_button]:font-black 
                                [&_.react-calendar__navigation_button]:text-lg
                                [&_.react-calendar__month-view__weekdays]:text-slate-400 
                                [&_.react-calendar__month-view__weekdays]:font-bold 
                                [&_.react-calendar__month-view__weekdays]:uppercase 
                                [&_.react-calendar__month-view__weekdays]:text-[0.65rem] 
                                [&_.react-calendar__month-view__weekdays__weekday_abbr]:no-underline
                                [&_.react-calendar__month-view__days__day]:text-slate-500 
                                [&_.react-calendar__month-view__days__day]:font-bold 
                                [&_.react-calendar__month-view__days__day]:p-4
                                [&_.react-calendar__tile--active]:bg-green-600! 
                                [&_.react-calendar__tile--active]:text-white! 
                                [&_.react-calendar__tile--active]:rounded-2xl 
                                [&_.react-calendar__tile--active]:shadow-lg 
                                [&_.react-calendar__tile--active]:shadow-green-200
                                [&_.react-calendar__tile--now]:bg-green-50 
                                [&_.react-calendar__tile--now]:rounded-2xl 
                                [&_.react-calendar__tile--now]:text-green-700
                                [&_.react-calendar__tile:hover]:bg-slate-100 
                                [&_.react-calendar__tile:hover]:rounded-2xl"
                        />
                    </div>

                    <div className="mt-8 p-6 bg-slate-100/50 rounded-4xl border border-slate-200 flex items-start gap-4">
                        <div className="mt-1 text-green-500">
                            <FaChevronRight size={14} />
                        </div>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed">
                            Mostrando el balance final de ventas. Los montos reflejan transacciones liquidadas.
                        </p>
                    </div>
                </aside>

                {/* Listado de Ventas */}
                <section className="lg:col-span-7 xl:col-span-8 space-y-6">
                    <div className="flex items-center gap-4 px-2">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Historial de Operaciones</h3>
                        <div className="h-px w-full bg-slate-200"></div>
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 bg-slate-50 animate-pulse rounded-4xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
                            {data && data.length > 0 ? (
                                data.map(transaction => (
                                    <div key={transaction.id} className="hover:translate-x-1 transition-transform">
                                        <TransactionSummary transaction={transaction} />
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-28 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                    <HiOutlineDocumentSearch className="text-7xl text-slate-200 mb-4" />
                                    <p className="text-slate-400 font-bold text-xl tracking-tight italic">Sin actividad registrada</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default TransactionFilter