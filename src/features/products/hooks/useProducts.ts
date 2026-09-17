"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts, productKeys } from "../api/products.queries";
import type { ProductListParams } from "../types";

export function useProducts(params: ProductListParams) {
  const { data, isLoading, error, isPlaceholderData, refetch } = useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => fetchProducts(params),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isLoading,
    error,
    isPreviousData: isPlaceholderData,
    refetch,
  };
}
