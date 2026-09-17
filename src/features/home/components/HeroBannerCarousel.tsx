"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AUTO_ADVANCE_MS = 4000;

const BANNERS = [
  { src: "/images/banner-01.png", alt: "Electronics, fashion, home & sports essentials" },
  { src: "/images/banner-02.png", alt: "Displays, appliances, apparel & outdoor gear" },
];

export function HeroBannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((current) => (current + 1) % BANNERS.length), AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, []);

  const banner = BANNERS[index];

  function goTo(next: number) {
    setIndex((next + BANNERS.length) % BANNERS.length);
  }

  return (
    <div className="relative hidden w-2/5 shrink-0 items-center justify-center md:flex">
      <Link href="/shop" className="relative h-56 w-full max-w-115 px-4" aria-label="Shop all products">
        <Image
          key={banner.src}
          src={banner.src}
          alt={banner.alt}
          fill
          sizes="500px"
          className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)]"
          priority={index === 0}
        />
      </Link>

      <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous banner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="flex gap-1.5">
          {BANNERS.map((item, dotIndex) => (
            <button
              key={item.src}
              type="button"
              onClick={() => goTo(dotIndex)}
              aria-label={`Show banner ${dotIndex + 1}`}
              className={dotIndex === index ? "h-1.5 w-5 rounded-full bg-gold" : "h-1.5 w-1.5 rounded-full bg-white/30"}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next banner"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
