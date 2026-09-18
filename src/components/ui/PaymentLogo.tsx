import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export type PaymentBrand =
  | "visa"
  | "mastercard"
  | "paypal"
  | "bkash"
  | "nagad"
  | "upay"
  | "bangla-qr"
  | "bangla-qr-mark";

interface PaymentLogoProps {
  brand: PaymentBrand;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const BRAND_ASSET: Record<PaymentBrand, { src: string; alt: string; ratio: number }> = {
  visa: { src: "/images/payment/visa.svg", alt: "Visa", ratio: 1000 / 324.68 },
  mastercard: { src: "/images/payment/mastercard.svg", alt: "Mastercard", ratio: 999.2 / 615 },
  paypal: { src: "/images/payment/paypal.svg", alt: "PayPal", ratio: 246 / 60 },
  bkash: { src: "/images/payment/bkash.png", alt: "bKash", ratio: 1 },
  nagad: { src: "/images/payment/nagad.png", alt: "Nagad", ratio: 432 / 287 },
  upay: { src: "/images/payment/upay.png", alt: "Upay", ratio: 300 / 280 },
  "bangla-qr": { src: "/images/payment/bangla-qr.svg", alt: "Bangla QR", ratio: 160 / 48 },
  "bangla-qr-mark": { src: "/images/payment/bangla-qr-mark.svg", alt: "Bangla QR", ratio: 1 },
};

const HEIGHTS: Record<NonNullable<PaymentLogoProps["size"]>, number> = { sm: 16, md: 22, lg: 30, xl: 40 };

export function PaymentLogo({ brand, size = "sm", className }: PaymentLogoProps) {
  const asset = BRAND_ASSET[brand];
  const height = HEIGHTS[size];
  const width = Math.round(height * asset.ratio);

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={width}
      height={height}
      className={cn("object-contain", className)}
      unoptimized
    />
  );
}
