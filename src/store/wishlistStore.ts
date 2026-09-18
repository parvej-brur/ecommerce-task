import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/api";

interface WishlistState {
  items: Product[];
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          return {
            items: exists
              ? state.items.filter((item) => item.id !== product.id)
              : [...state.items, product],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      isWishlisted: (productId) => get().items.some((item) => item.id === productId),
    }),
    { name: "wishlist-storage", partialize: (state) => ({ items: state.items }) },
  ),
);
