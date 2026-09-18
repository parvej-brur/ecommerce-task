import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { sortProducts } from "../../../../src/features/products/utils/sortProducts.ts";
import type { Product } from "../../../../src/types/api.ts";

function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "1",
    title: "Product",
    description: "",
    price: 10,
    rating: 4,
    reviewsCount: 0,
    stock: 1,
    inStock: true,
    category: "General",
    image: "/p.png",
    sku: "SKU",
    tags: [],
    relatedIds: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    ...overrides,
  };
}

const products: Product[] = [
  createProduct({ id: "a", price: 30, rating: 4.1, createdAt: "2024-02-01T00:00:00.000Z" }),
  createProduct({ id: "b", price: 10, rating: 4.9, createdAt: "2024-03-01T00:00:00.000Z" }),
  createProduct({ id: "c", price: 20, rating: 3.5, createdAt: "2024-01-01T00:00:00.000Z" }),
];

describe("sortProducts", () => {
  it("sorts by price ascending", () => {
    const result = sortProducts(products, "price-asc");
    assert.deepEqual(
      result.map((p) => p.id),
      ["b", "c", "a"],
    );
  });

  it("sorts by price descending", () => {
    const result = sortProducts(products, "price-desc");
    assert.deepEqual(
      result.map((p) => p.id),
      ["a", "c", "b"],
    );
  });

  it("sorts by rating descending", () => {
    const result = sortProducts(products, "rating-desc");
    assert.deepEqual(
      result.map((p) => p.id),
      ["b", "a", "c"],
    );
  });

  it("sorts by newest first", () => {
    const result = sortProducts(products, "newest");
    assert.deepEqual(
      result.map((p) => p.id),
      ["b", "a", "c"],
    );
  });

  it("leaves the order unchanged when no sort option is given", () => {
    const result = sortProducts(products);
    assert.deepEqual(
      result.map((p) => p.id),
      ["a", "b", "c"],
    );
  });

  it("does not mutate the input array", () => {
    const original = [...products];
    sortProducts(products, "price-asc");
    assert.deepEqual(products, original);
  });
});
