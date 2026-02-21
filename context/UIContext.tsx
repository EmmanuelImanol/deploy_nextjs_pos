"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <UIContext.Provider value={{ isCartOpen, openCart, closeCart }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI debe usarse dentro de UIProvider");
  return context;
};