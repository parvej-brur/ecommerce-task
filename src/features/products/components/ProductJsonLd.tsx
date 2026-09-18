import type { Product } from "@/types/api";
import { buildProductJsonLd } from "../utils/buildProductJsonLd";

export function ProductJsonLd({ product }: { product: Product }) {
  const data = buildProductJsonLd(product);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
