import { SORT_OPTIONS } from "../schemas/product-filters.schema";

export const SORT_LABELS: Record<(typeof SORT_OPTIONS)[number], string> = {
  newest: "Newest",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  "rating-desc": "Highest Rated",
};

export const PRICE_RANGES = [
  { key: "all", label: "Any Price", priceMin: null, priceMax: null },
  { key: "0-50", label: "Under ৳50", priceMin: null, priceMax: 50 },
  { key: "50-100", label: "৳50 – ৳100", priceMin: 50, priceMax: 100 },
  { key: "100-300", label: "৳100 – ৳300", priceMin: 100, priceMax: 300 },
  { key: "300+", label: "৳300+", priceMin: 300, priceMax: null },
] as const;

export const RATING_OPTIONS = [
  { key: "all", label: "Any Rating", stars: null, minRating: null },
  { key: "4", label: "4 Stars & Up", stars: 4, minRating: 4 },
  { key: "3", label: "3 Stars & Up", stars: 3, minRating: 3 },
  { key: "2", label: "2 Stars & Up", stars: 2, minRating: 2 },
] as const;

export function activePriceRangeKey(
  priceMin: number | null,
  priceMax: number | null,
): string {
  const match = PRICE_RANGES.find(
    (range) => range.priceMin === priceMin && range.priceMax === priceMax,
  );
  return match?.key ?? "all";
}

export function activeRatingKey(minRating: number | null): string {
  const match = RATING_OPTIONS.find((option) => option.minRating === minRating);
  return match?.key ?? "all";
}
