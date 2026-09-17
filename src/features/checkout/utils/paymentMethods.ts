export const PAYMENT_METHODS = [
  "card",
  "merchant",
  "cod",
  "bangla-qr",
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const MERCHANT_PROVIDERS = ["bkash", "nagad", "upay"] as const;
export type MerchantProvider = (typeof MERCHANT_PROVIDERS)[number];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  card: "Card",
  merchant: "Merchant Account",
  cod: "Cash on Delivery",
  "bangla-qr": "Bangla QR",
};

export const MERCHANT_PROVIDER_LABELS: Record<MerchantProvider, string> = {
  bkash: "bKash",
  nagad: "Nagad",
  upay: "Upay",
};
