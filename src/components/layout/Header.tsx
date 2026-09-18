"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { HeaderSearchBar } from "@/components/layout/HeaderSearchBar";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export function Header() {
  const pathname = usePathname();
  const isHydrated = useIsHydrated();
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartCount = isHydrated ? items.reduce((total, item) => total + item.quantity, 0) : 0;
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = isHydrated ? wishlistItems.length : 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white font-sans">
      <AnnouncementBar />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          className="flex shrink-0 items-center p-1 text-zinc-700 hover:text-brand md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div>
            <div className="text-xl leading-none font-extrabold tracking-tight text-brand-dark">Sikdar Bazar</div>
            <div className="mt-0.5 text-[9px] font-semibold tracking-widest text-brand uppercase">
              Premium Store
            </div>
          </div>
        </Link>

        <Suspense fallback={<div className="mx-auto hidden max-w-xl flex-1 md:block" />}>
          <HeaderSearchBar />
        </Suspense>

        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href="/wishlist"
            className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 text-zinc-700 hover:text-brand"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[10px] font-semibold">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={toggleCart}
            className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 text-zinc-700 hover:text-brand"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="text-[10px] font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="hidden flex-col items-center gap-0.5 px-3 py-1.5 text-zinc-700 hover:text-brand md:flex"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[10px] font-semibold">Account</span>
          </button>
        </div>
      </div>

      {pathname !== "/" ? (
        <Suspense fallback={<div className="h-10.5 bg-brand" />}>
          <CategoryNav />
        </Suspense>
      ) : null}

      <MobileNavDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
