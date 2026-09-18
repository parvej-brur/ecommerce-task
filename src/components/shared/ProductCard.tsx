"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { getStockStatus } from "@/lib/utils/getStockStatus";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types/api";
import { AddToCartButton } from "./AddToCartButton";
import { RatingStars } from "./RatingStars";

type ProductCardProps = {
  product: Product;
  onHoverPrefetch?: (productId: string) => void;
};

export function ProductCard({ product, onHoverPrefetch }: ProductCardProps) {
  const isHydrated = useIsHydrated();
  const isWishlisted = useWishlistStore((state) => state.items.some((item) => item.id === product.id));
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const wishlisted = isHydrated && isWishlisted;
  const stock = getStockStatus(product);

  const handleMouseEnter = useCallback(() => {
    onHoverPrefetch?.(product.id);
  }, [onHoverPrefetch, product.id]);

  return (
    <Link
      href={`/products/${product.id}`}
      onMouseEnter={handleMouseEnter}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-200 hover:-translate-y-0.75 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)]"
    >
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          toggleWishlistItem(product);
        }}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={wishlisted ? "#e53935" : "none"}
          stroke={wishlisted ? "#e53935" : "#888"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {product.discount ? (
        <span className="absolute top-2.5 left-2.5 z-10 rounded bg-gold px-2 py-1 text-[10px] font-bold text-amber-900">
          -{product.discount}%
        </span>
      ) : null}

      <div className="relative aspect-4/3 w-full overflow-hidden bg-brand-light">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[10px] font-semibold tracking-wide text-brand uppercase">
          {product.category}
        </span>
        <h3 className="line-clamp-2 min-h-9.5 text-sm font-semibold text-zinc-900">
          {product.title}
        </h3>
        <RatingStars
          rating={product.rating}
          reviewsCount={product.reviewsCount}
        />

        <div className="flex items-baseline gap-1.5 pt-0.5">
          <span className="font-mono text-lg font-bold tracking-tight text-brand-dark">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice ? (
            <span className="font-mono text-xs text-zinc-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          ) : null}
        </div>

        <div className="mb-1 flex items-center gap-1.5">
          <span className={cn("h-1.5 w-1.5 rounded-full", stock.dotColor)} />
          <span className={cn("text-[11px] font-medium", stock.textColor)}>
            {stock.label}
          </span>
        </div>

        <AddToCartButton
          product={product}
          size="sm"
          className="mt-auto w-full"
        />
      </div>
    </Link>
  );
}
