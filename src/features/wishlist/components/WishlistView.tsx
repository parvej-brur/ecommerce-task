"use client";

import Link from "next/link";
import { EmptyState } from "@/components/shared/EmptyState";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { Button } from "@/components/ui/Button";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useWishlistStore } from "@/store/wishlistStore";

export function WishlistView() {
  const isHydrated = useIsHydrated();
  const items = useWishlistStore((state) => state.items);
  const wishlistedProducts = isHydrated ? items : [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-6 pb-16">
      <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-brand-dark">My Wishlist</h1>

      {wishlistedProducts.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          action={
            <Link href="/shop">
              <Button variant="primary">Browse Products</Button>
            </Link>
          }
        />
      ) : (
        <ProductGrid products={wishlistedProducts} />
      )}
    </div>
  );
}
