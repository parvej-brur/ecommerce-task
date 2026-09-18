import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { CATEGORY_ICONS, PRODUCT_CATEGORIES } from "@/lib/constants/product-categories";

export function CategorySidebar() {
  return (
    <div className="hidden w-64 shrink-0 flex-col gap-3 lg:flex">
      <div className="flex h-13 shrink-0 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white">
        <Menu className="size-4" strokeWidth={2} />
        Shop by Categories
        <ChevronDown className="ml-auto size-3" strokeWidth={2.5} />
      </div>
      <nav className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-white p-2">
        {PRODUCT_CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/shop?category=${encodeURIComponent(category)}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-zinc-700 hover:bg-brand-light hover:text-brand"
          >
            <span className="text-base">{CATEGORY_ICONS[category]}</span>
            {category}
          </Link>
        ))}
        <Link
          href="/shop"
          className="mt-auto flex items-center gap-1.5 border-t border-border px-3 pt-3 text-[13px] font-semibold text-brand hover:text-brand-hover"
        >
          View All Categories
          <ArrowRight className="size-3.5" strokeWidth={2.5} />
        </Link>
      </nav>
    </div>
  );
}
