"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Pagination } from "@/components/shared/Pagination";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductGridSkeleton } from "@/components/shared/ProductGridSkeleton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { fetchProductDetail, productKeys } from "../api/products.queries";
import { useProducts } from "../hooks/useProducts";
import {
  RESET_PRODUCT_FILTERS,
  productSearchParamsParsers,
  toProductListParams,
} from "../utils/searchParams";
import { ProductFilters } from "./ProductFilters";

export function ProductListView() {
  const [filters, setFilters] = useQueryStates(productSearchParamsParsers);
  const queryClient = useQueryClient();

  const { data, isLoading, error, isPreviousData, refetch } = useProducts(
    toProductListParams(filters),
  );

  // Stable across renders so it doesn't invalidate the `productGrid` memo below.
  const prefetchProduct = useCallback(
    (productId: string) => {
      queryClient.prefetchQuery({
        queryKey: productKeys.detail(productId),
        queryFn: () => fetchProductDetail(productId),
      });
    },
    [queryClient],
  );

  const productGrid = useMemo(
    () =>
      data ? (
        <ProductGrid
          products={data.products}
          className="sm:grid-cols-2 lg:grid-cols-3"
          onHoverPrefetch={prefetchProduct}
        />
      ) : null,
    [data, prefetchProduct],
  );

  const listingTitle = filters.search
    ? `Search results for "${filters.search}"`
    : (filters.category ?? "All Products");

  const chips: { label: string; onRemove: () => void }[] = [];
  if (filters.search)
    chips.push({
      label: `"${filters.search}"`,
      onRemove: () => setFilters({ search: null, page: 1 }),
    });
  if (filters.category)
    chips.push({
      label: filters.category,
      onRemove: () => setFilters({ category: null, page: 1 }),
    });
  if (filters.priceMin != null || filters.priceMax != null) {
    chips.push({
      label:
        filters.priceMin != null && filters.priceMax != null
          ? `৳${filters.priceMin} – ৳${filters.priceMax}`
          : filters.priceMax != null
            ? `Under ৳${filters.priceMax}`
            : `৳${filters.priceMin}+`,
      onRemove: () => setFilters({ priceMin: null, priceMax: null, page: 1 }),
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="mb-4 flex items-center gap-1.5 text-xs text-zinc-500">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span>›</span>
        <span className="font-semibold text-brand-dark">{listingTitle}</span>
      </div>

      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-dark">
          {listingTitle}
        </h1>
        {data ? (
          <span className="text-[13px] text-zinc-500">
            {data.total} products
          </span>
        ) : null}
      </div>

      <div className="flex flex-col items-start gap-6 lg:flex-row">
        <ProductFilters />

        <div className="min-w-0 flex-1">
          {chips.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-chip-border bg-brand-light px-3 py-1 text-xs font-medium text-brand"
                >
                  {chip.label}
                  <button
                    type="button"
                    onClick={chip.onRemove}
                    aria-label={`Remove ${chip.label} filter`}
                    className="text-sm opacity-60 hover:opacity-100"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {error ? (
            <ErrorState
              message="Failed to load products"
              onRetry={() => refetch()}
            />
          ) : isLoading && !data ? (
            <ProductGridSkeleton className="sm:grid-cols-2 lg:grid-cols-3" />
          ) : data && data.products.length === 0 ? (
            <EmptyState
              title="No products found. Try different filters"
              action={
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setFilters(RESET_PRODUCT_FILTERS)}
                >
                  Clear filters
                </Button>
              }
            />
          ) : data ? (
            <div
              className={cn(
                "transition-opacity",
                isPreviousData && "opacity-60",
              )}
            >
              {productGrid}
            </div>
          ) : null}
        </div>
      </div>

      {data && data.products.length > 0 ? (
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          onPageChange={(page) => setFilters({ page })}
          disabled={isPreviousData}
        />
      ) : null}
    </div>
  );
}
