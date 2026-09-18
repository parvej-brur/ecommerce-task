import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/", current: true },
  { label: "Deals", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Best Sellers", href: "/shop?sort=rating-desc" },
  { label: "Flash Sale", href: "#flash-sale" },
];

export function HomeNavRow() {
  return (
    <nav className="flex h-13 shrink-0 items-center gap-6 overflow-x-auto rounded-xl border border-border bg-white px-5">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={
            link.current
              ? "shrink-0 text-[13px] font-bold text-brand"
              : "shrink-0 text-[13px] font-semibold text-zinc-600 hover:text-brand"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
