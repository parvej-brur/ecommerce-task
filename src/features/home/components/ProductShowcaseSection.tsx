import Link from "next/link";
import { ProductGrid } from "@/components/shared/ProductGrid";
import type { Product } from "@/types/api";

interface ProductShowcaseSectionProps {
  title: string;
  subtitle: string;
  viewAllHref: string;
  products: Product[];
}

export function ProductShowcaseSection({ title, subtitle, viewAllHref, products }: ProductShowcaseSectionProps) {
  if (products.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-2 pb-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-extrabold tracking-tight text-brand-dark">{title}</h2>
          <p className="mt-0.5 text-[13px] text-zinc-500">{subtitle}</p>
        </div>
        <Link
          href={viewAllHref}
          className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-brand hover:border-brand hover:bg-brand-light"
        >
          View All →
        </Link>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
