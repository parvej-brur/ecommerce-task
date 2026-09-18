"use client";

import { useQueryStates } from "nuqs";
import { Select } from "@/components/ui/Select";
import { PRODUCT_CATEGORIES } from "@/lib/constants/product-categories";
import { cn } from "@/lib/utils/cn";
import { SORT_OPTIONS } from "../schemas/product-filters.schema";
import {
  PRICE_RANGES,
  RATING_OPTIONS,
  SORT_LABELS,
  activePriceRangeKey,
  activeRatingKey,
} from "../utils/filterOptions";
import {
  RESET_PRODUCT_FILTERS,
  productSearchParamsParsers,
} from "../utils/searchParams";
import { RatingOptionLabel } from "./RatingOptionLabel";

export function ProductFilters() {
  const [filters, setFilters] = useQueryStates(productSearchParamsParsers);

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.sort ||
    filters.priceMin != null ||
    filters.priceMax != null ||
    filters.minRating != null;
  const activePriceKey = activePriceRangeKey(
    filters.priceMin,
    filters.priceMax,
  );
  const activeRating = activeRatingKey(filters.minRating);

  return (
    <aside className="hidden w-full shrink-0 rounded-xl border border-border bg-white p-5 lg:sticky lg:top-32.5 lg:block lg:w-60">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-bold text-brand-dark">Filters</span>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => setFilters(RESET_PRODUCT_FILTERS)}
            className="text-[11px] font-semibold text-danger hover:underline"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <div className="mb-4.5">
        <div className="mb-2 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
          Category
        </div>
        <label className="flex cursor-pointer items-center gap-2 py-1 text-[13px]">
          <input
            type="radio"
            name="category"
            checked={!filters.category}
            onChange={() => setFilters({ category: null, page: 1 })}
            className="accent-brand"
          />
          <span
            className={cn(
              filters.category
                ? "text-zinc-600"
                : "font-semibold text-brand-dark",
            )}
          >
            All Categories
          </span>
        </label>
        {PRODUCT_CATEGORIES.map((category) => (
          <label
            key={category}
            className="flex cursor-pointer items-center gap-2 py-1 text-[13px]"
          >
            <input
              type="radio"
              name="category"
              checked={filters.category === category}
              onChange={() => setFilters({ category, page: 1 })}
              className="accent-brand"
            />
            <span
              className={cn(
                filters.category === category
                  ? "font-semibold text-brand-dark"
                  : "text-zinc-600",
              )}
            >
              {category}
            </span>
          </label>
        ))}
      </div>

      <div className="mb-4.5">
        <div className="mb-2 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
          Price Range
        </div>
        {PRICE_RANGES.map((range) => (
          <label
            key={range.key}
            className="flex cursor-pointer items-center gap-2 py-1 text-[13px]"
          >
            <input
              type="radio"
              name="price"
              checked={activePriceKey === range.key}
              onChange={() =>
                setFilters({
                  priceMin: range.priceMin,
                  priceMax: range.priceMax,
                  page: 1,
                })
              }
              className="accent-brand"
            />
            <span
              className={cn(
                activePriceKey === range.key
                  ? "font-semibold text-brand-dark"
                  : "text-zinc-600",
              )}
            >
              {range.label}
            </span>
          </label>
        ))}
      </div>

      <div className="mb-4.5">
        <div className="mb-2 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
          Rating
        </div>
        {RATING_OPTIONS.map((option) => (
          <label
            key={option.key}
            className="flex cursor-pointer items-center gap-2 py-1 text-[13px]"
          >
            <input
              type="radio"
              name="rating"
              checked={activeRating === option.key}
              onChange={() =>
                setFilters({ minRating: option.minRating, page: 1 })
              }
              className="accent-brand"
            />
            <RatingOptionLabel
              option={option}
              active={activeRating === option.key}
            />
          </label>
        ))}
      </div>

      <div>
        <div className="mb-2 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
          Sort By
        </div>
        <Select
          value={filters.sort ?? "newest"}
          onChange={(event) =>
            setFilters({
              sort: event.target.value as (typeof SORT_OPTIONS)[number],
              page: 1,
            })
          }
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {SORT_LABELS[option]}
            </option>
          ))}
        </Select>
      </div>
    </aside>
  );
}
