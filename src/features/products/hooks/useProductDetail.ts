"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProductDetail, productKeys } from "../api/products.queries";

export function useProductDetail(id: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductDetail(id),
    enabled: Boolean(id),
  });

  return {
    product: data?.product,
    relatedProducts: data?.relatedProducts ?? [],
    isLoading,
    error,
    refetch,
  };
}
