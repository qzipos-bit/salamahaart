"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  type CartCatalog,
  type CartItem,
} from "@/lib/cart-types";
import {
  cartAddItem,
  cartGetItemsSnapshot,
  cartGetItemsServerSnapshot,
  cartGetOpenSnapshot,
  cartSetItems,
  cartSetOpen,
  cartSubscribe,
} from "@/lib/cart-store";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: {
    catalog: CartCatalog;
    slug: string;
    title: string;
    price: string;
    productPath: string;
    variantId?: string;
    priceRub?: number;
    priceRubMax?: number;
  }) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    cartSubscribe,
    cartGetItemsSnapshot,
    cartGetItemsServerSnapshot,
  );
  const open = useSyncExternalStore(
    cartSubscribe,
    cartGetOpenSnapshot,
    () => false,
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const openCart = useCallback(() => cartSetOpen(true), []);
  const closeCart = useCallback(() => cartSetOpen(false), []);

  const addItem = useCallback(
    (item: {
      catalog: CartCatalog;
      slug: string;
      title: string;
      price: string;
      productPath: string;
      variantId?: string;
      priceRub?: number;
      priceRubMax?: number;
    }) => {
      cartAddItem(item);
    },
    [],
  );

  const setQuantity = useCallback((id: string, quantity: number) => {
    const q = Math.max(1, Math.min(99, Math.round(quantity)));
    const prev = cartGetItemsSnapshot();
    cartSetItems(prev.map((p) => (p.id === id ? { ...p, quantity: q } : p)));
  }, []);

  const removeItem = useCallback((id: string) => {
    const prev = cartGetItemsSnapshot();
    cartSetItems(prev.filter((p) => p.id !== id));
  }, []);

  const clearCart = useCallback(() => cartSetItems([]), []);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      open,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      open,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
