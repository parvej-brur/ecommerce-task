import { siteConfig } from "@/config/site";
import type { Product } from "@/types/api";

export function buildProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [product.image],
    sku: product.sku,
    category: product.category,
    ...(product.reviewsCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewsCount,
      },
    }),
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/${product.id}`,
      priceCurrency: "BDT",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}
