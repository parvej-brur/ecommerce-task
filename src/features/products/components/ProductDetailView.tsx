"use client";

import { Check, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { ErrorState } from "@/components/shared/ErrorState";
import { RatingStars } from "@/components/shared/RatingStars";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { getStockStatus } from "@/lib/utils/getStockStatus";
import { useWishlistStore } from "@/store/wishlistStore";
import { useProductDetail } from "../hooks/useProductDetail";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";
import { RelatedProducts } from "./RelatedProducts";

export function ProductDetailView({ productId }: { productId: string }) {
  const { product, relatedProducts, isLoading, error, refetch } = useProductDetail(productId);
  const [quantity, setQuantity] = useState(1);
  const isHydrated = useIsHydrated();
  const isWishlisted = useWishlistStore((state) =>
    product ? state.items.some((item) => item.id === product.id) : false,
  );
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const wishlisted = isHydrated && isWishlisted;

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-6">
        <ErrorState message="Failed to load product" onRetry={() => refetch()} />
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-6">
        <ProductDetailSkeleton />
      </div>
    );
  }

  const stock = getStockStatus(product);

  return (
    <div className="mx-auto max-w-6xl px-6 py-6 pb-16">
      <div className="mb-5 flex items-center gap-1.5 text-xs text-zinc-500">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href="/shop" className="hover:text-brand">
          Shop
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-semibold text-brand-dark">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-brand-light">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
          {product.discount ? (
            <span className="absolute top-3 left-3 rounded bg-gold px-2.5 py-1 text-xs font-bold text-amber-900">
              -{product.discount}%
            </span>
          ) : null}
        </div>

        <div>
          <span className="text-[11px] font-semibold tracking-wide text-brand uppercase">
            {product.category}
          </span>
          <h1 className="mt-2 mb-3 text-[28px] leading-tight font-extrabold tracking-tight text-brand-dark">
            {product.title}
          </h1>
          <div className="mb-4 flex items-center gap-2">
            <RatingStars rating={product.rating} />
            <span className="text-[13px] text-zinc-500">({product.reviewsCount} reviews)</span>
          </div>

          <div className="mb-4 flex items-baseline gap-3">
            <span className="font-mono text-[32px] font-extrabold tracking-tight text-brand-dark">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice ? (
              <>
                <span className="font-mono text-lg text-zinc-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="rounded bg-gold px-2.5 py-1 text-xs font-bold text-amber-900">
                  -{product.discount}%
                </span>
              </>
            ) : null}
          </div>

          <div className={cn("mb-5 inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5", stock.bgColor)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", stock.dotColor)} />
            <span className={cn("text-xs font-semibold", stock.textColor)}>{stock.label}</span>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-zinc-600">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="mb-6">
              <div className="mb-2.5 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
                Highlights
              </div>
              <div className="flex flex-col gap-1.5">
                {product.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-2">
                    <Check className="size-3.5 text-[#1b6d44]" strokeWidth={2.5} />
                    <span className="text-[13px] text-zinc-700 capitalize">{tag.replace(/-/g, " ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              max={product.stock || 99}
              className="w-full sm:w-auto"
            />
            <AddToCartButton product={product} quantity={quantity} size="lg" className="w-full sm:flex-1" />
            <button
              type="button"
              onClick={() => toggleWishlistItem(product)}
              className={cn(
                "flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-4.5 text-sm font-semibold transition-colors sm:w-auto",
                wishlisted ? "border-danger/30 bg-red-50 text-danger" : "border-border text-zinc-600 hover:bg-red-50",
              )}
            >
              <Heart className={cn("size-4.5", wishlisted && "fill-danger")} strokeWidth={2} />
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          <div className="flex flex-wrap gap-5 border-t border-border py-4">
            {["Free Shipping", "30-Day Returns", "2-Year Warranty"].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Check className="size-3.5 text-zinc-400" strokeWidth={2} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-xl font-extrabold text-brand-dark">You May Also Like</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
