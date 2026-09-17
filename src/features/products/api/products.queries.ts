import { apiClient } from "@/lib/api/client";
import type { ApiResponse, PaginatedProducts, Product } from "@/types/api";
import type { ProductListParams } from "../types";

export interface ProductDetailResult {
  product: Product;
  relatedProducts: Product[];
}

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: ProductListParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export async function fetchProducts(params: ProductListParams): Promise<PaginatedProducts> {
  const response = await apiClient.get<ApiResponse<PaginatedProducts>>("/products", {
    params,
  });
  return response.data.data;
}

export async function fetchProductDetail(id: string): Promise<ProductDetailResult> {
  const response = await apiClient.get<ApiResponse<ProductDetailResult>>(`/products/${id}`);
  return response.data.data;
}
