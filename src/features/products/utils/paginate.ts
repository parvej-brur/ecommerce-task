import type { PaginatedProducts, Product } from "@/types/api";

export function paginateProducts(
  products: Product[],
  page: number,
  limit: number,
): PaginatedProducts {
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return {
    products: products.slice(start, start + limit),
    total,
    page,
    totalPages,
    hasNextPage: page < totalPages,
  };
}
