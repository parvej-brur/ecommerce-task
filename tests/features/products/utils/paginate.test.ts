import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { paginateProducts } from "../../../../src/features/products/utils/paginate.ts";
import type { Product } from "../../../../src/types/api.ts";

function createProduct(id: string): Product {
  return {
    id,
    title: `Product ${id}`,
    description: "",
    price: 10,
    rating: 4,
    reviewsCount: 0,
    stock: 1,
    inStock: true,
    category: "General",
    image: "/p.png",
    sku: `SKU-${id}`,
    tags: [],
    relatedIds: [],
    createdAt: "2024-01-01T00:00:00.000Z",
  };
}

const products: Product[] = Array.from({ length: 25 }, (_, i) => createProduct(String(i + 1)));

describe("paginateProducts", () => {
  it("returns the first page slice", () => {
    const result = paginateProducts(products, 1, 10);
    assert.deepEqual(
      result.products.map((p) => p.id),
      products.slice(0, 10).map((p) => p.id),
    );
  });

  it("returns the correct slice for a middle page", () => {
    const result = paginateProducts(products, 2, 10);
    assert.deepEqual(
      result.products.map((p) => p.id),
      products.slice(10, 20).map((p) => p.id),
    );
  });

  it("returns a partial slice for the last page", () => {
    const result = paginateProducts(products, 3, 10);
    assert.equal(result.products.length, 5);
  });

  it("computes totalPages by rounding up", () => {
    const result = paginateProducts(products, 1, 10);
    assert.equal(result.totalPages, 3);
    assert.equal(result.total, 25);
  });

  it("sets hasNextPage correctly across pages", () => {
    assert.equal(paginateProducts(products, 1, 10).hasNextPage, true);
    assert.equal(paginateProducts(products, 3, 10).hasNextPage, false);
  });

  it("returns an empty page with totalPages of 1 for an empty product list", () => {
    const result = paginateProducts([], 1, 10);
    assert.deepEqual(result.products, []);
    assert.equal(result.total, 0);
    assert.equal(result.totalPages, 1);
    assert.equal(result.hasNextPage, false);
  });

  it("returns an empty products array when the page is beyond the last page", () => {
    const result = paginateProducts(products, 10, 10);
    assert.deepEqual(result.products, []);
    assert.equal(result.total, 25);
  });
});
