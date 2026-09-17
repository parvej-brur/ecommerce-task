import Link from "next/link";
import { ProductGrid } from "@/components/shared/ProductGrid";
import type { Product } from "@/types/api";
import { FlashSaleCountdown } from "./FlashSaleCountdown";

export function FlashSaleSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div id="flash-sale" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-2 pb-6">
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="mb-5 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="text-xl font-extrabold text-brand-dark">Flash Sale</span>
          </div>
          <span className="text-xs font-medium text-zinc-500">Limited time offers</span>
          <FlashSaleCountdown />
          <Link
            href="/shop"
            className="rounded-md border border-border px-3.5 py-1.5 text-xs font-semibold text-brand hover:border-brand hover:bg-brand-light"
          >
            View All →
          </Link>
        </div>
        <ProductGrid products={products} className="sm:grid-cols-3 lg:grid-cols-5" />
      </div>
    </div>
  );
}
