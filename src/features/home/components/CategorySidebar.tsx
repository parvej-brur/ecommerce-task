import Link from "next/link";
import { CATEGORY_ICONS, PRODUCT_CATEGORIES } from "@/lib/constants/product-categories";

export function CategorySidebar() {
  return (
    <div className="hidden w-64 shrink-0 flex-col gap-3 lg:flex">
      <div className="flex h-13 shrink-0 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        Shop by Categories
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" className="ml-auto">
          <polyline points="6 9 12 15 18 9" />
        </svg>
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
          View All Categories →
        </Link>
      </nav>
    </div>
  );
}
