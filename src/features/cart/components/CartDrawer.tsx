"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useCartStore } from "@/store/cartStore";
import { CartDrawerItem } from "./CartDrawerItem";

export function CartDrawer() {
  const router = useRouter();
  const isHydrated = useIsHydrated();
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isHydrated || !isOpen) return null;

  return (
    <>
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="fixed inset-0 z-[60] cursor-default bg-black/40 backdrop-blur-[2px]"
      />
      <div className="animate-slide-in-right fixed top-0 right-0 bottom-0 z-70 flex w-[420px] max-w-full flex-col bg-white font-sans shadow-[-8px_0_32px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-lg font-bold text-brand-dark">
            Shopping Cart <span className="text-sm font-medium text-zinc-500">({itemCount})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1 text-zinc-500 hover:text-zinc-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" className="mb-4">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <div className="mb-1 text-[15px] font-bold text-zinc-800">Your cart is empty</div>
            <div className="mb-4 text-[13px] text-zinc-500">Add items to get started</div>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-lg bg-brand px-5 py-2.5 text-[13px] font-bold text-white hover:bg-brand-hover"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <CartDrawerItem key={item.productId} item={item} />
              ))}
            </div>
            <div className="border-t border-border px-6 py-5">
              <div className="mb-1.5 flex justify-between text-[13px] text-zinc-500">
                <span>Subtotal</span>
                <span className="font-mono">{formatCurrency(subtotal)}</span>
              </div>
              <div className="mb-3 flex justify-between text-[13px] text-zinc-500">
                <span>Shipping</span>
                <span className="font-semibold text-brand">Free</span>
              </div>
              <div className="mb-4 flex justify-between border-t border-border pt-3 text-lg font-bold text-brand-dark">
                <span>Total</span>
                <span className="font-mono">{formatCurrency(subtotal)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push("/checkout");
                }}
                className="w-full rounded-[10px] bg-brand py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-hover active:scale-[0.99]"
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 w-full rounded-[10px] border border-border py-2.5 text-[13px] font-semibold text-zinc-600 hover:border-brand hover:text-brand"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
