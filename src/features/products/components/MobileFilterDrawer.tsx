"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useQueryStates } from "nuqs";
import { Button } from "@/components/ui/Button";
import { PRODUCT_CATEGORIES } from "@/lib/constants/product-categories";
import {
  PRICE_RANGES,
  RATING_OPTIONS,
  activePriceRangeKey,
  activeRatingKey,
} from "../utils/filterOptions";
import {
  RESET_PRODUCT_FILTERS,
  productSearchParamsParsers,
} from "../utils/searchParams";
import { FilterOptionRow } from "./FilterOptionRow";
import { FilterSection } from "./FilterSection";
import { RatingOptionLabel } from "./RatingOptionLabel";

// Matches the `lg:` breakpoint where the desktop sidebar takes over.
const DESKTOP_QUERY = "(min-width: 1024px)";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  total?: number;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  total,
}: MobileFilterDrawerProps) {
  const [filters, setFilters] = useQueryStates(productSearchParamsParsers);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    // Rotating a tablet past `lg` swaps to the sidebar — don't leave the page locked.
    const media = window.matchMedia(DESKTOP_QUERY);
    const onMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onMediaChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onMediaChange);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasActiveFilters =
    filters.category ||
    filters.priceMin != null ||
    filters.priceMax != null ||
    filters.minRating != null;
  const activePriceKey = activePriceRangeKey(filters.priceMin, filters.priceMax);
  const activeRating = activeRatingKey(filters.minRating);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="fixed inset-0 z-60 cursor-default bg-black/40 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className="fixed top-0 bottom-0 left-0 z-70 flex"
      >
        <div className="animate-slide-in-left flex w-80 max-w-[calc(100vw-3.5rem)] flex-col bg-white font-sans shadow-[8px_0_32px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="text-lg font-extrabold tracking-tight text-brand-dark">
              Filters
            </span>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={() => setFilters(RESET_PRODUCT_FILTERS)}
                className="text-xs font-semibold text-danger"
              >
                Clear all
              </button>
            ) : null}
          </div>

          {/* Radios sharing a `name` form one document-wide group when there is no <form>,
              so these use `mobile-*` names — the hidden desktop sidebar's radios would
              otherwise uncheck them whenever a filter changes. */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-3">
            <FilterSection title="Categories">
              <FilterOptionRow
                name="mobile-category"
                checked={!filters.category}
                onSelect={() => setFilters({ category: null, page: 1 })}
              >
                All Categories
              </FilterOptionRow>
              {PRODUCT_CATEGORIES.map((category) => (
                <FilterOptionRow
                  key={category}
                  name="mobile-category"
                  checked={filters.category === category}
                  onSelect={() => setFilters({ category, page: 1 })}
                >
                  {category}
                </FilterOptionRow>
              ))}
            </FilterSection>

            <FilterSection title="Price Range">
              {PRICE_RANGES.map((range) => (
                <FilterOptionRow
                  key={range.key}
                  name="mobile-price"
                  checked={activePriceKey === range.key}
                  onSelect={() =>
                    setFilters({
                      priceMin: range.priceMin,
                      priceMax: range.priceMax,
                      page: 1,
                    })
                  }
                >
                  {range.label}
                </FilterOptionRow>
              ))}
            </FilterSection>

            <FilterSection title="Rating">
              {RATING_OPTIONS.map((option) => (
                <FilterOptionRow
                  key={option.key}
                  name="mobile-rating"
                  checked={activeRating === option.key}
                  onSelect={() =>
                    setFilters({ minRating: option.minRating, page: 1 })
                  }
                >
                  <RatingOptionLabel
                    option={option}
                    active={activeRating === option.key}
                  />
                </FilterOptionRow>
              ))}
            </FilterSection>
          </div>

          <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button variant="primary" size="lg" className="w-full" onClick={onClose}>
              {total != null ? `Show ${total} products` : "Show products"}
            </Button>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="mt-3 ml-4 flex h-9 w-9 shrink-0 items-center justify-center text-white hover:text-white/80"
        >
          <X className="size-6.5" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
