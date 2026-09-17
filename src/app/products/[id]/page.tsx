import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProductById, getRelatedProducts, ProductDetailView, productKeys } from "@/features/products";
import { isApiError } from "@/lib/api/errors";
import type { Product } from "@/types/api";

// React.cache dedupes this within a single request, so generateMetadata and the
// page body share one lookup instead of hitting the data layer twice.
const loadProduct = cache(async (id: string): Promise<Product | null> => {
  try {
    return await getProductById(id);
  } catch (error) {
    if (isApiError(error) && error.statusCode === 404) return null;
    throw error;
  }
});

export async function generateMetadata({
  params,
}: PageProps<"/products/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = await loadProduct(id);
  if (!product) notFound();

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = await loadProduct(id);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(id);

  const queryClient = new QueryClient();
  queryClient.setQueryData(productKeys.detail(id), { product, relatedProducts });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailView productId={id} />
    </HydrationBoundary>
  );
}
