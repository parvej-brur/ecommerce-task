import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/api";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  className?: string;
  onHoverPrefetch?: (productId: string) => void;
}

export function ProductGrid({ products, className, onHoverPrefetch }: ProductGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onHoverPrefetch={onHoverPrefetch} />
      ))}
    </div>
  );
}
