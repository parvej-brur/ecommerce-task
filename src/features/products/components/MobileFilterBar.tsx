"use client";

import { SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";
import { useQueryStates } from "nuqs";
import { Select } from "@/components/ui/Select";
import { SORT_OPTIONS } from "../schemas/product-filters.schema";
import { SORT_LABELS } from "../utils/filterOptions";
import { productSearchParamsParsers } from "../utils/searchParams";
import { MobileFilterDrawer } from "./MobileFilterDrawer";

interface MobileFilterBarProps {
  total?: number;
}

export function MobileFilterBar({ total }: MobileFilterBarProps) {
  const [filters, setFilters] = useQueryStates(productSearchParamsParsers);
  const [isOpen, setIsOpen] = useState(false);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const activeCount =
    (filters.category ? 1 : 0) +
    (filters.priceMin != null || filters.priceMax != null ? 1 : 0) +
    (filters.minRating != null ? 1 : 0);

  return (
    <div className="mb-4 flex items-center gap-3 border-t border-border pt-4 lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-label={
          activeCount > 0 ? `Filters, ${activeCount} active` : "Filters"
        }
        className="relative flex h-10.5 shrink-0 items-center gap-2 rounded-lg border border-brand bg-brand-light px-3.5 text-sm font-bold text-brand transition-colors active:bg-brand-light-hover"
      >
        <SlidersHorizontal className="size-4" strokeWidth={2.2} />
        Filters
        {activeCount > 0 ? (
          <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[11px] leading-none font-bold text-white">
            {activeCount}
          </span>
        ) : null}
      </button>

      <Select
        aria-label="Sort by"
        value={filters.sort ?? "newest"}
        onChange={(event) =>
          setFilters({
            sort: event.target.value as (typeof SORT_OPTIONS)[number],
            page: 1,
          })
        }
        className="min-w-0 flex-1"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {SORT_LABELS[option]}
          </option>
        ))}
      </Select>

      <MobileFilterDrawer isOpen={isOpen} onClose={closeDrawer} total={total} />
    </div>
  );
}
