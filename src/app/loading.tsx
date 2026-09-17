import { ProductGridSkeleton } from "@/components/shared/ProductGridSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div aria-hidden="true">
      <div className="mx-auto max-w-7xl px-6 pt-4">
        <div className="flex items-stretch gap-4">
          <div className="hidden w-64 shrink-0 flex-col gap-3 lg:flex">
            <Skeleton tone="green" className="h-13 w-full shrink-0" />
            <Skeleton className="h-80 w-full flex-1" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <Skeleton className="h-13 w-full shrink-0" />
            <Skeleton tone="green" className="h-96 w-full" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="grid grid-cols-1 grid-rows-2 gap-3.5 md:grid-cols-[5fr_4fr]">
          <Skeleton tone="green" className="row-span-2 min-h-85 w-full" />
          <Skeleton tone="tan" className="min-h-40 w-full" />
          <div className="grid grid-cols-2 gap-3.5">
            <Skeleton tone="blue" className="min-h-40 w-full" />
            <Skeleton tone="pink" className="min-h-40 w-full" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-2 pb-6">
        <Skeleton className="h-72 w-full" />
      </div>

      {["New Arrivals", "Best Sellers"].map((label) => (
        <div key={label} className="mx-auto max-w-7xl px-6 py-2 pb-6">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-9 w-24" />
          </div>
          <ProductGridSkeleton />
        </div>
      ))}
    </div>
  );
}
