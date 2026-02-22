import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { UIProvider } from "@/context/UIContext";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import "react-calendar/dist/Calendar.css"
import Providers from "./providers";
import CartAside from "@/components/cart/CartAside";

const outfit = Outfit({subsets:['latin']})

export const metadata: Metadata = {
  title: "POS - Next.js",
  description: "POS - Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} bg-gray-200`}
      >
        <Providers>
          <CartProvider>
            <UIProvider>
              <CartAside />
              {children}
            </UIProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
