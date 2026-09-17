import { ProductGridSkeleton } from "@/components/shared/ProductGridSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-6" aria-hidden="true">
      <Skeleton className="mb-4 h-4 w-40" />
      <Skeleton className="mb-5 h-7 w-52" />

      <div className="flex flex-col items-start gap-6 lg:flex-row">
        <Skeleton className="h-125 w-full shrink-0 lg:w-60" />
        <div className="min-w-0 flex-1">
          <ProductGridSkeleton className="sm:grid-cols-2 lg:grid-cols-3" />
        </div>
      </div>
    </div>
  );
}
