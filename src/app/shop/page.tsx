import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import {
  getProducts,
  productKeys,
  ProductListView,
  productSearchParamsCache,
  toProductListParams,
} from "@/features/products";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Search, filter, and sort our full product catalog.",
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const parsed = productSearchParamsCache.parse(await searchParams);
  const params = toProductListParams(parsed);

  const queryClient = new QueryClient();
  const initialProducts = await getProducts(params);
  queryClient.setQueryData(productKeys.list(params), initialProducts);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
}
