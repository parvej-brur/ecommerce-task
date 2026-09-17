import "server-only";
import productsData from "./products.mock.json";
import type { Product } from "@/types/api";

const products: Product[] = productsData as Product[];
const productsById = new Map<string, Product>(
  products.map((product) => [product.id, product]),
);

// Module-level singleton: `products.mock.json` is parsed once per server instance.
export function getAllProducts(): Product[] {
  return products;
}

export function getProductMap(): ReadonlyMap<string, Product> {
  return productsById;
}
