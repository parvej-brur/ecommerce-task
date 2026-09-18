import type { MetadataRoute } from "next";
import { getAllProducts } from "@/features/products";
import { env } from "@/config/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;

  const productEntries: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${siteUrl}/products/${product.id}`,
    lastModified: product.createdAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/shop`, changeFrequency: "daily", priority: 0.9 },
    ...productEntries,
  ];
}
