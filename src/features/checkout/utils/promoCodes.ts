interface PromoCode {
  type: "percentage" | "flat";
  value: number;
  minSubtotal?: number;
}

const PROMO_CODES: Record<string, PromoCode> = {
  SAVE10: { type: "percentage", value: 10 },
  WELCOME50: { type: "flat", value: 50, minSubtotal: 150 },
};

export function getPromoDiscount(code: string, subtotal: number): number {
  const promo = PROMO_CODES[code.trim().toUpperCase()];
  if (!promo) return 0;
  if (promo.minSubtotal && subtotal < promo.minSubtotal) return 0;

  const rawDiscount = promo.type === "percentage" ? (subtotal * promo.value) / 100 : promo.value;
  return Math.min(rawDiscount, subtotal);
}
