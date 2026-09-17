import Image from "next/image";
import Link from "next/link";

export function PromoBanners() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-5">
      <div className="grid grid-cols-1 grid-rows-2 gap-3.5 md:grid-cols-[5fr_4fr]">
        <Link
          href="/shop"
          className="relative row-span-2 flex min-h-85 flex-col justify-end overflow-hidden rounded-2xl bg-linear-to-b from-brand to-brand-dark p-8 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(20,51,38,0.25)]"
        >
          <span className="absolute top-4 left-5 rounded bg-gold px-3 py-1 text-[10px] font-extrabold tracking-wide text-amber-900 uppercase">
            Weekend
          </span>
          <div className="relative z-10 max-w-[62%]">
            <div className="mb-1.5 text-[34px] leading-tight font-extrabold tracking-tight text-white">
              MEGA SALE
            </div>
            <div className="mb-1 text-xl font-bold text-[#a7f3d0]">Up to 50% OFF</div>
            <div className="mb-5 text-[13px] text-white/60">On Selected Items</div>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-5 py-2.5 text-[13px] font-bold text-brand-dark">
              Shop Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
          <Image
            src="/images/mega_sale.png"
            alt="Shopping cart full of bagged groceries"
            width={181}
            height={174}
            className="pointer-events-none absolute top-1/2 right-4 h-44 w-44 -translate-y-1/2 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] sm:h-52 sm:w-52"
          />
        </Link>

        <Link
          href="/shop?category=Home%20%26%20Kitchen"
          className="relative flex items-center overflow-hidden rounded-2xl bg-linear-to-br from-[#f0ede8] to-[#e8e2d8] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="min-w-0 flex-1 pr-24">
            <div className="mb-1 text-[10px] font-bold tracking-wide text-[#78716c] uppercase">
              Home &amp; Kitchen
            </div>
            <div className="mb-1 text-[22px] leading-tight font-extrabold text-[#292524]">Essentials</div>
            <div className="mb-3 text-sm font-bold text-brand">Up to 30% OFF</div>
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700">
              Shop Now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
          <Image
            src="/images/best_deals.png"
            alt="Stack of gift-wrapped boxes"
            width={359}
            height={244}
            className="pointer-events-none absolute right-3 h-24 w-24 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] sm:h-28 sm:w-28"
          />
        </Link>

        <div className="grid grid-cols-2 gap-3.5">
          <Link
            href="/shop?category=Electronics"
            className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#dbeafe] to-[#bfdbfe] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          >
            <div className="max-w-[65%]">
              <span className="mb-2 inline-block rounded bg-[#1e40af] px-2 py-0.75 text-[9px] font-extrabold tracking-wide text-white uppercase">
                Electronics
              </span>
              <div className="mb-1 text-lg leading-tight font-extrabold text-[#1e3a5f]">Best Deals</div>
              <div className="mb-2.5 text-[13px] font-bold text-danger">Up to 40% OFF</div>
              <span className="inline-flex items-center gap-1 rounded-md border border-[#93c5fd] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#1e3a5f]">
                Shop Now →
              </span>
            </div>
            <Image
              src="/images/electronics.png"
              alt="Headphones, smartwatch, and tablet"
              width={402}
              height={278}
              className="pointer-events-none absolute right-2 bottom-2 h-20 w-20 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.2)] sm:h-24 sm:w-24"
            />
          </Link>

          <Link
            href="/shop?category=Clothing"
            className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#fce7f3] to-[#fbcfe8] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          >
            <div className="max-w-[65%]">
              <span className="mb-2 inline-block rounded bg-[#be185d] px-2 py-0.75 text-[9px] font-extrabold tracking-wide text-white uppercase">
                Fashion
              </span>
              <div className="mb-1 text-lg leading-tight font-extrabold text-[#831843]">New Collection</div>
              <div className="mb-2.5 text-[13px] font-bold text-danger">Up to 50% OFF</div>
              <span className="inline-flex items-center gap-1 rounded-md border border-[#f9a8d4] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#831843]">
                Shop Now →
              </span>
            </div>
            <Image
              src="/images/fashion.png"
              alt="Blazer, handbag, and sneakers"
              width={408}
              height={289}
              className="pointer-events-none absolute right-2 bottom-2 h-20 w-20 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.2)] sm:h-24 sm:w-24"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
