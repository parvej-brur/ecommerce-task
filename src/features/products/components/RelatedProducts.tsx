import { ProductGrid } from "@/components/shared/ProductGrid";
import type { Product } from "@/types/api";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return <ProductGrid products={products} />;
}
