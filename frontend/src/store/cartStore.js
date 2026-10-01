/**
 * cartStore — Zustand store: the shopping cart of the customer app.
 *
 * Only ids and quantities are stored (names and prices always come from menuService, so they
 * can never be stale). The cart is kept in localStorage, so it survives a page reload.
 *
 *   const add = useCartStore((state) => state.add);
 *   const count = useCartStore(selectCartCount);
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const MAX_QUANTITY = 99;

const clamp = (quantity) => Math.min(MAX_QUANTITY, Math.max(1, Math.round(Number(quantity) || 1)));

const useCartStore = create(
  persist(
    (set) => ({
      items: [], // [{ id, quantity }]

      // Adds `quantity` of a food; adding the same food again increases its quantity.
      add: (id, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          if (!existing) return { items: [...state.items, { id, quantity: clamp(quantity) }] };

          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: clamp(item.quantity + quantity) } : item
            ),
          };
        }),

      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: clamp(quantity) } : item)),
        })),

      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'restaurant-cart',
      version: 1,
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Total number of units in the cart (what the badge shows).
export const selectCartCount = (state) => state.items.reduce((sum, item) => sum + item.quantity, 0);

export default useCartStore;
