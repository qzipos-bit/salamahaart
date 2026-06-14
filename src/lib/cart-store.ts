import type { CartCatalog, CartItem } from "@/lib/cart-types";
import { cartItemId } from "@/lib/cart-types";
import { normalizeCartItems } from "@/lib/cart-item-sync";

const STORAGE_KEY = "salamaha-cart-v1";

type Listener = () => void;

let listeners = new Set<Listener>();
let items: CartItem[] = [];
let open = false;
let hydrated = false;

const EMPTY_CART_ITEMS: CartItem[] = [];

function readStoredItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return normalizeCartItems(
      parsed.filter(
        (i) =>
          i &&
          typeof i.id === "string" &&
          typeof i.quantity === "number" &&
          i.quantity > 0,
      ),
    );
  } catch {
    return [];
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  if (!hydrated) return;
  const serialized = JSON.stringify(items);
  if (localStorage.getItem(STORAGE_KEY) === serialized) return;
  localStorage.setItem(STORAGE_KEY, serialized);
}

export function cartHydrate(): void {
  if (hydrated) return;
  items = readStoredItems();
  hydrated = true;
}

export function cartSubscribe(listener: Listener): () => void {
  cartHydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function cartGetItemsSnapshot(): CartItem[] {
  cartHydrate();
  return items;
}

export function cartGetItemsServerSnapshot(): CartItem[] {
  return EMPTY_CART_ITEMS;
}

export function cartGetOpenSnapshot(): boolean {
  return open;
}

export function cartGetItemCountSnapshot(): number {
  cartHydrate();
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartSetItems(next: CartItem[]): void {
  items = next;
  persist();
  emit();
}

export function cartSetOpen(next: boolean): void {
  if (open === next) return;
  open = next;
  emit();
}

export function cartAddItem(item: {
  catalog: CartCatalog;
  slug: string;
  title: string;
  price: string;
  productPath: string;
  variantId?: string;
  priceRub?: number;
  priceRubMax?: number;
}): void {
  const normalized = normalizeCartItems([
    {
      id: cartItemId(item.catalog, item.slug, item.variantId),
      catalog: item.catalog,
      slug: item.slug,
      title: item.title,
      price: item.price,
      productPath: item.productPath,
      quantity: 1,
      variantId: item.variantId,
      priceRub: item.priceRub,
      priceRubMax: item.priceRubMax,
    },
  ])[0];

  const id = normalized.id;
  const prev = cartGetItemsSnapshot();
  const existing = prev.find((p) => p.id === id);
  if (existing) {
    cartSetItems(
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: Math.min(99, p.quantity + 1),
              price: normalized.price,
              priceRub: normalized.priceRub,
              priceRubMax: normalized.priceRubMax,
            }
          : p,
      ),
    );
  } else {
    cartSetItems([...prev, normalized]);
  }
}

export function cartRemoveItem(id: string): void {
  const prev = cartGetItemsSnapshot();
  if (!prev.some((p) => p.id === id)) return;
  cartSetItems(prev.filter((p) => p.id !== id));
}

export function cartDecrementItem(id: string): void {
  const prev = cartGetItemsSnapshot();
  const item = prev.find((p) => p.id === id);
  if (!item) return;
  if (item.quantity <= 1) {
    cartSetItems(prev.filter((p) => p.id !== id));
  } else {
    cartSetItems(
      prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p,
      ),
    );
  }
}

export function cartGetItemQuantity(
  catalog: CartCatalog,
  slug: string,
  variantId?: string,
): number {
  const id = cartItemId(catalog, slug, variantId);
  const item = cartGetItemsSnapshot().find((p) => p.id === id);
  return item?.quantity ?? 0;
}
