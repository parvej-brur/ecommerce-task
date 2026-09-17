"use client";

import { useMemo } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useCartStore } from "@/store/cartStore";

const TAX_RATE = 0.08;

export function OrderSummary() {
  const items = useCartStore((state) => state.items);
  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const tax = subtotal * TAX_RATE;

  return (
    <div className="rounded-xl border border-border bg-white p-6 lg:sticky lg:top-32.5">
      <h2 className="mb-4 text-base font-bold text-brand-dark">
        Order Summary <span className="text-[13px] font-medium text-zinc-500">({itemCount} items)</span>
      </h2>

      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.productId} className="flex gap-3 border-b border-zinc-100 py-2.5 last:border-b-0">
            <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-lg bg-brand-light">
              <Image src={item.image} alt={item.name} fill sizes="52px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-zinc-800">{item.name}</p>
              <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
            </div>
            <span className="shrink-0 font-mono text-[13px] font-semibold text-brand-dark">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between text-[13px] text-zinc-500">
          <span>Subtotal</span>
          <span className="font-mono">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[13px] text-zinc-500">
          <span>Shipping</span>
          <span className="font-semibold text-brand">Free</span>
        </div>
        <div className="flex justify-between text-[13px] text-zinc-500">
          <span>Tax (est.)</span>
          <span className="font-mono">{formatCurrency(tax)}</span>
        </div>
        <div className="mt-1 flex justify-between border-t border-border pt-3 text-lg font-bold text-brand-dark">
          <span>Total</span>
          <span className="font-mono">{formatCurrency(subtotal + tax)}</span>
        </div>
      </div>
    </div>
  );
}
