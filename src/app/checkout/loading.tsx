import { Skeleton } from "@/components/ui/Skeleton";

export default function CheckoutLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-6 pb-16" aria-hidden="true">
      <Skeleton className="mb-4 h-4 w-32" />
      <Skeleton className="mb-6 h-7 w-32" />
      <Skeleton className="mb-8 h-10 w-full" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
