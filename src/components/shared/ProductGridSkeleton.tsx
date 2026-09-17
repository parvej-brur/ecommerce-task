import { cn } from "@/lib/utils/cn";
import { Skeleton } from "@/components/ui/Skeleton";

const SKELETON_COUNT = 12;

export function ProductGridSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", className)}
      aria-hidden="true"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div key={index} className="flex flex-col gap-3 rounded-xl border border-border bg-white p-3">
          <Skeleton className="aspect-4/3 w-full" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
    </div>
  );
}
