"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { getPromoDiscount } from "../utils/promoCodes";

const TAX_RATE = 0.08;

export function useOrderTotals() {
  const items = useCartStore((state) => state.items);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const tax = subtotal * TAX_RATE;
  const discount = promoCode ? getPromoDiscount(promoCode, subtotal) : 0;
  const total = Math.max(subtotal + tax - discount, 0);

  function applyPromoCode(code: string) {
    const discountAmount = getPromoDiscount(code, subtotal);
    if (discountAmount <= 0) {
      setPromoCode(null);
      setPromoError("This promo code isn't valid for your order");
      return;
    }
    setPromoCode(code.trim().toUpperCase());
    setPromoError(null);
  }

  function removePromoCode() {
    setPromoCode(null);
    setPromoError(null);
  }

  return {
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
  };
}
