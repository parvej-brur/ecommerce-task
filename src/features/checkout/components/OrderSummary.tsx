"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { useOrderTotals } from "../hooks/useOrderTotals";

type OrderSummaryProps = ReturnType<typeof useOrderTotals>;

export function OrderSummary({
  items,
  itemCount,
  subtotal,
  tax,
  discount,
  total,
  promoCode,
  promoError,
  applyPromoCode,
  removePromoCode,
}: OrderSummaryProps) {
  const [promoInput, setPromoInput] = useState("");

  function handleApply() {
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
  }

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

      <div className="mt-4 border-t border-border pt-4">
        <div className="mb-1.5 text-xs font-semibold text-zinc-600">Promo Code</div>
        {promoCode ? (
          <div className="flex items-center justify-between rounded-lg border border-brand-chip-border bg-brand-light px-3 py-2 text-[13px]">
            <span className="font-semibold text-brand-dark">{promoCode} applied</span>
            <button
              type="button"
              onClick={removePromoCode}
              className="text-xs font-semibold text-danger hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={promoInput}
              onChange={(event) => setPromoInput(event.target.value)}
              placeholder="Enter code"
              aria-label="Promo code"
              className="flex-1"
            />
            <Button type="button" variant="secondary" onClick={handleApply} className="shrink-0 px-4">
              Apply
            </Button>
          </div>
        )}
        {promoError ? <p className="mt-1.5 text-xs text-danger">{promoError}</p> : null}
      </div>

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
        {discount > 0 ? (
          <div className="flex justify-between text-[13px] text-brand">
            <span>Discount</span>
            <span className="font-mono">-{formatCurrency(discount)}</span>
          </div>
        ) : null}
        <div className="mt-1 flex justify-between border-t border-border pt-3 text-lg font-bold text-brand-dark">
          <span>Total</span>
          <span className="font-mono">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
