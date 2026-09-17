import type { FilterParams, Product } from "@/types/api";

export function filterProducts(products: Product[], filters: FilterParams): Product[] {
  let result = products;

  if (filters.category) {
    const category = filters.category.toLowerCase();
    result = result.filter((product) => product.category.toLowerCase() === category);
  }

  if (filters.priceMin !== undefined) {
    result = result.filter((product) => product.price >= filters.priceMin!);
  }

  if (filters.priceMax !== undefined) {
    result = result.filter((product) => product.price <= filters.priceMax!);
  }

  if (filters.minRating !== undefined) {
    result = result.filter((product) => product.rating >= filters.minRating!);
  }

  if (filters.search) {
    result = matchProductsByQuery(result, filters.search);
  }

  return result;
}

/** Pre-filters on title first (cheapest, most selective match) before scanning description/tags/category. */
export function matchProductsByQuery(products: Product[], query: string): Product[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return products;

  const titleMatches = products.filter((product) =>
    product.title.toLowerCase().includes(needle),
  );
  if (titleMatches.length > 0) return titleMatches;

  return products.filter(
    (product) =>
      product.description.toLowerCase().includes(needle) ||
      product.category.toLowerCase().includes(needle) ||
      product.tags.some((tag) => tag.toLowerCase().includes(needle)),
  );
}
