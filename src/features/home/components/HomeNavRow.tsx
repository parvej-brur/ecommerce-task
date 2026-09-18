import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "Home", href: "/", current: true },
  { label: "Deals", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Best Sellers", href: "/shop?sort=rating-desc" },
  { label: "Flash Sale", href: "#flash-sale", highlight: true },
];

export function HomeNavRow() {
  return (
    <nav
      aria-label="Home sections"
      className="scrollbar-none flex h-13 shrink-0 items-center gap-1.5 overflow-x-auto rounded-xl border border-border bg-white px-2 pr-8 mask-[linear-gradient(to_right,#000_calc(100%-24px),transparent)] md:pr-2 md:mask-none"
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          aria-current={link.current ? "page" : undefined}
          className={cn(
            "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:px-4",
            link.current
              ? "bg-brand text-white shadow-sm"
              : "text-zinc-600 hover:bg-brand-light hover:text-brand",
          )}
        >
          {link.highlight ? (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="text-gold-hover"
            >
              <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
            </svg>
          ) : null}
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
