import type { Metadata } from "next";
import { env } from "@/config/env";

export const siteConfig = {
  name: "Sikdar Bazar",
  title: "Sikdar Bazar - Everything you need, delivered to your doorstep",
  description:
    "Shop electronics, fashion, home essentials, books & more — all in one place with free delivery and easy returns.",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "en_US",
} as const;

// Shared across route segments so pages that must declare their own `openGraph`
// object (which replaces the inherited one entirely) don't lose these fields.
export const baseOpenGraph = {
  type: "website",
  siteName: siteConfig.name,
  locale: siteConfig.locale,
} satisfies NonNullable<Metadata["openGraph"]>;
