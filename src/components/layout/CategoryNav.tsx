"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Deals", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Best Sellers", href: "/shop?sort=rating-desc" },
  { label: "Collections", href: "/shop" },
];

export function CategoryNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function isActive(href: string) {
    const [path, query] = href.split("?");
    if (pathname !== path) return false;
    // "Deals" and "Collections" both point at the unfiltered shop page — since neither
    // maps to a distinct query, treat them as non-highlightable rather than have both
    // light up together.
    if (!query) return path === "/";
    return searchParams.get("sort") === new URLSearchParams(query).get("sort");
  }

  return (
    <nav className="bg-brand">
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "border-b-2 py-2.75 font-sans text-[13px] whitespace-nowrap transition-colors hover:text-white hover:border-white/50",
              isActive(item.href)
                ? "border-gold font-bold text-white"
                : "border-transparent font-semibold text-white/80",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
