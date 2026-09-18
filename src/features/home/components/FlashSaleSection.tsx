import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { ProductGrid } from "@/components/shared/ProductGrid";
import type { Product } from "@/types/api";
import { FlashSaleCountdown } from "./FlashSaleCountdown";

export function FlashSaleSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div
      id="flash-sale"
      className="mx-auto max-w-7xl scroll-mt-28 px-6 py-2 pb-6"
    >
      <div className="rounded-2xl border border-border bg-white p-3 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="size-5 fill-gold text-gold" strokeWidth={2} />
            <span className="text-xl font-extrabold text-brand-dark">
              Flash Sale
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-danger/10 px-2.5 py-1 text-[11px] font-semibold text-danger">
            <span className="size-1.5 animate-pulse rounded-full bg-danger" />
            Limited time offers
          </span>
          <FlashSaleCountdown />
          <Link
            href="/shop"
            className="ml-auto flex items-center gap-1 rounded-md border border-border px-3.5 py-1.5 text-xs font-semibold text-brand hover:border-brand hover:bg-brand-light sm:ml-0"
          >
            View All
            <ArrowRight className="size-3" strokeWidth={2.5} />
          </Link>
        </div>
        <ProductGrid
          products={products}
          className="sm:grid-cols-3 lg:grid-cols-5"
        />
      </div>
    </div>
  );
}
