import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { filterProducts, matchProductsByQuery } from "../../../../src/features/products/utils/filterProducts.ts";
import type { Product } from "../../../../src/types/api.ts";

function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "1",
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse with USB receiver",
    price: 25,
    rating: 4.2,
    reviewsCount: 10,
    stock: 5,
    inStock: true,
    category: "Electronics",
    image: "/mouse.png",
    sku: "SKU-1",
    tags: ["wireless", "office"],
    relatedIds: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    ...overrides,
  };
}

const products: Product[] = [
  createProduct({
    id: "1",
    title: "Wireless Mouse",
    category: "Electronics",
    price: 25,
    rating: 4.2,
    tags: ["wireless", "office"],
  }),
  createProduct({
    id: "2",
    title: "Mechanical Keyboard",
    category: "Electronics",
    price: 80,
    rating: 4.8,
    tags: ["typing", "rgb"],
  }),
  createProduct({
    id: "3",
    title: "Yoga Mat",
    category: "Fitness",
    price: 20,
    rating: 3.9,
    description: "Non-slip exercise mat",
    tags: ["yoga"],
  }),
  createProduct({
    id: "4",
    title: "Water Bottle",
    category: "Fitness",
    price: 15,
    rating: 4.5,
    tags: ["hydration"],
  }),
];

describe("filterProducts", () => {
  it("filters by category case-insensitively", () => {
    const result = filterProducts(products, { category: "electronics" });
    assert.deepEqual(
      result.map((p) => p.id),
      ["1", "2"],
    );
  });

  it("filters by minimum price", () => {
    const result = filterProducts(products, { priceMin: 20 });
    assert.deepEqual(
      result.map((p) => p.id).sort(),
      ["1", "2", "3"],
    );
  });

  it("filters by maximum price", () => {
    const result = filterProducts(products, { priceMax: 20 });
    assert.deepEqual(
      result.map((p) => p.id).sort(),
      ["3", "4"],
    );
  });

  it("filters by minimum rating", () => {
    const result = filterProducts(products, { minRating: 4.5 });
    assert.deepEqual(
      result.map((p) => p.id).sort(),
      ["2", "4"],
    );
  });

  it("combines multiple filters", () => {
    const result = filterProducts(products, { category: "fitness", priceMax: 18 });
    assert.deepEqual(
      result.map((p) => p.id),
      ["4"],
    );
  });

  it("prioritizes title matches over description/tag matches when searching", () => {
    // "wireless" is in product 1's title only — product 3 mentions it nowhere,
    // so this also proves the title-hit short-circuit skips the fallback scan.
    const result = filterProducts(products, { search: "wireless" });
    assert.deepEqual(
      result.map((p) => p.id),
      ["1"],
    );
  });

  it("falls back to description/category/tags when no title matches", () => {
    // "hydration" only appears in product 4's tags, never in any title.
    const result = filterProducts(products, { search: "hydration" });
    assert.deepEqual(
      result.map((p) => p.id),
      ["4"],
    );
  });

  it("returns no products for a search with no matches anywhere", () => {
    const result = filterProducts(products, { search: "nonexistent-xyz" });
    assert.deepEqual(result, []);
  });

  it("returns all products when no filters are given", () => {
    const result = filterProducts(products, {});
    assert.equal(result.length, products.length);
  });
});

describe("matchProductsByQuery", () => {
  it("returns all products for an empty or whitespace-only query", () => {
    assert.equal(matchProductsByQuery(products, "   ").length, products.length);
  });

  it("matches case-insensitively", () => {
    const result = matchProductsByQuery(products, "KEYBOARD");
    assert.deepEqual(
      result.map((p) => p.id),
      ["2"],
    );
  });
});
