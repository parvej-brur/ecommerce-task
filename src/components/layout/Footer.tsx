import Link from "next/link";

const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Deals", href: "/shop" },
      { label: "Collections", href: "/shop" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Track Order", href: "#" },
      { label: "Return & Refund", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "About Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark font-sans text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight">PS Bazaar</span>
          </div>
          <p className="max-w-70 text-[13px] leading-relaxed text-white/50">
            Your one-stop destination for quality products at the best prices. Shop more, save more.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <div className="mb-3.5 text-[13px] font-bold text-white/80">{column.title}</div>
            <div className="flex flex-col gap-2 text-[13px] text-white/50">
              {column.links.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div className="mb-3.5 text-[13px] font-bold text-white/80">Contact</div>
          <div className="flex flex-col gap-2 text-[13px] text-white/50">
            <span>support@psbazaar.com</span>
            <span>+1 (800) 123-4567</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
        <span className="text-xs text-white/35">© {new Date().getFullYear()} PS Bazaar. All Rights Reserved.</span>
        <div className="flex gap-2">
          {["VISA", "MASTERCARD", "PAYPAL"].map((brand) => (
            <span key={brand} className="rounded bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/60">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
