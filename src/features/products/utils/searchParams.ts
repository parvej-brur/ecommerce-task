import {
  createSearchParamsCache,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { SORT_OPTIONS } from "../schemas/product-filters.schema";
import type { ProductListParams } from "../types";

export const PRODUCTS_PAGE_SIZE = 20;

export const productSearchParamsParsers = {
  search: parseAsString.withDefault(""),
  category: parseAsString.withDefault(""),
  sort: parseAsStringEnum([...SORT_OPTIONS]),
  page: parseAsInteger.withDefault(1),
  priceMin: parseAsFloat,
  priceMax: parseAsFloat,
  minRating: parseAsFloat,
};

export const productSearchParamsCache = createSearchParamsCache(productSearchParamsParsers);

type ParsedProductSearchParams = {
  search: string;
  category: string;
  sort: (typeof SORT_OPTIONS)[number] | null;
  page: number;
  priceMin: number | null;
  priceMax: number | null;
  minRating: number | null;
};

/** Normalizes parsed nuqs state into query params — used identically on the server (prefetch) and client (useProducts) so the resulting TanStack Query cache keys match and hydration dedupes the initial request. */
export function toProductListParams(parsed: ParsedProductSearchParams): ProductListParams {
  return {
    search: parsed.search || undefined,
    category: parsed.category || undefined,
    sort: parsed.sort ?? undefined,
    page: parsed.page,
    limit: PRODUCTS_PAGE_SIZE,
    priceMin: parsed.priceMin ?? undefined,
    priceMax: parsed.priceMax ?? undefined,
    minRating: parsed.minRating ?? undefined,
  };
}

export const RESET_PRODUCT_FILTERS = {
  search: null,
  category: null,
  sort: null,
  page: null,
  priceMin: null,
  priceMax: null,
  minRating: null,
} as const;
