import Link from "next/link";
import { HeroBannerCarousel } from "./HeroBannerCarousel";

const TRUST_BADGES = [
  { label: "Best Quality", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  {
    label: "Best Prices",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </>
    ),
  },
  {
    label: "Fast Delivery",
    icon: (
      <>
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v5a2 2 0 0 1-2 2h-1" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
  },
  {
    label: "Easy Returns",
    icon: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </>
    ),
  },
];

export function HeroBanner() {
  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl bg-linear-to-br from-brand-dark via-brand to-[#1a7a4a]">
      <div className="pointer-events-none absolute -top-20 -right-20 h-65 w-65 rounded-full bg-white/[0.04]" />
      <div className="pointer-events-none absolute bottom-[-60px] left-[15%] h-45 w-45 rounded-full bg-white/[0.03]" />

      <div className="relative z-10 flex flex-col md:min-h-100 md:flex-row">
        <div className="flex flex-1 flex-col justify-center px-8 py-10">
          <div className="mb-2.5 text-[15px] font-semibold tracking-wide text-gold uppercase">
            Everything You Need,
          </div>
          <h1 className="mb-1 text-4xl leading-[1.05] font-extrabold tracking-tight text-white uppercase sm:text-5xl">
            Delivered
          </h1>
          <h1 className="mb-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-white uppercase sm:text-5xl">
            to Your <span className="text-gold">Doorstep</span>
          </h1>
          <p className="mb-6 max-w-105 text-sm leading-relaxed text-white/65">
            Shop electronics, fashion, home essentials, books &amp; more — all in one place with
            free delivery and easy returns.
          </p>

          <div className="mb-7 flex flex-wrap gap-5">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
                    {badge.icon}
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/75">{badge.label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/shop"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-[15px] font-bold text-brand-dark shadow-[0_4px_12px_rgba(251,191,36,0.3)] transition-all hover:-translate-y-0.5 hover:bg-gold-hover hover:shadow-[0_6px_20px_rgba(251,191,36,0.4)]"
          >
            Shop Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <HeroBannerCarousel />
      </div>
    </div>
  );
}
