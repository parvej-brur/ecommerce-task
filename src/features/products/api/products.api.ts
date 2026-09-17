import "server-only";
import { NotFoundError, ValidationError } from "@/lib/api/errors";
import type { FilterParams, PaginatedProducts, Product } from "@/types/api";
import { getAllProducts, getProductMap } from "./products.loader";
import { productFiltersSchema } from "../schemas/product-filters.schema";
import { filterProducts, matchProductsByQuery } from "../utils/filterProducts";
import { paginateProducts } from "../utils/paginate";
import { sortProducts } from "../utils/sortProducts";

export async function getProducts(filters: FilterParams): Promise<PaginatedProducts> {
  const parsed = productFiltersSchema.safeParse(filters);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid filter parameters");
  }

  const { page, limit, sort, ...rest } = parsed.data;
  const filtered = filterProducts(getAllProducts(), rest);
  const sorted = sortProducts(filtered, sort);

  return paginateProducts(sorted, page, limit);
}

export async function getProductById(id: string): Promise<Product> {
  const product = getProductMap().get(id);
  if (!product) {
    throw new NotFoundError(`Product with id ${id} was not found`);
  }
  return product;
}

export async function getRelatedProducts(
  productId: string,
  limit: number = 3,
): Promise<Product[]> {
  const product = await getProductById(productId);
  const productMap = getProductMap();

  return product.relatedIds
    .slice(0, limit)
    .map((id) => productMap.get(id))
    .filter((related): related is Product => related !== undefined);
}

/** Returns the top 10 matches, title-first for a fast, index-friendly lookup. */
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) {
    throw new ValidationError("Search query must not be empty");
  }
  return matchProductsByQuery(getAllProducts(), query).slice(0, 10);
}

export async function filterByCategory(category: string): Promise<Product[]> {
  const needle = category.toLowerCase();
  return getAllProducts().filter((product) => product.category.toLowerCase() === needle);
}

export async function filterByPrice(min: number, max: number): Promise<Product[]> {
  if (min > max) {
    throw new ValidationError("min must be less than or equal to max");
  }
  return getAllProducts().filter((product) => product.price >= min && product.price <= max);
}

export { sortProducts };
