import { Skeleton } from "@/components/ui/Skeleton";
import { ProductDetailSkeleton } from "@/features/products";

export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-6 pb-16" aria-hidden="true">
      <Skeleton className="mb-5 h-4 w-56" />
      <ProductDetailSkeleton />

      <div className="mt-12">
        <Skeleton className="mb-4 h-6 w-48" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="aspect-4/3 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
