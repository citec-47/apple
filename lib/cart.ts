"use client";

export interface CartLine {
  productSlug: string;
  productName: string;
  heroImage: string | null;
  configuration: Record<string, string>;
  unitPriceCents: number;
  quantity: number;
}

const KEY = "apple-storefront-cart-v1";

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(lines: CartLine[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent("cart:changed"));
}

export function getCart(): CartLine[] {
  return read();
}

export function addToCart(line: CartLine): void {
  const lines = read();
  lines.push(line);
  write(lines);
}

export function updateQuantity(index: number, quantity: number): void {
  const lines = read();
  if (lines[index]) {
    if (quantity <= 0) {
      lines.splice(index, 1);
    } else {
      lines[index].quantity = quantity;
    }
    write(lines);
  }
}

export function removeFromCart(index: number): void {
  const lines = read();
  lines.splice(index, 1);
  write(lines);
}

export function clearCart(): void {
  write([]);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.unitPriceCents * l.quantity, 0);
}
