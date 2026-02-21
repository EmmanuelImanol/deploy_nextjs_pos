"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Product, CartItemCount } from "@/src/schemas";

interface CartContextType {
  cart: CartItemCount[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: Product['id']) => void;
  updateQuantity: (id: Product['id'], quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemCount[]>([]);

  // Lógica para agregar al carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);

      if (itemExists) {
        // Si ya existe, aumentamos la cantidad
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      // Si es nuevo, lo agregamos con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: Product['id']) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: Product['id'], quantity: number) => {
    if (quantity <= 0) return;
    setCart(prevCart => prevCart.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};