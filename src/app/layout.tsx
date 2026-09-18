import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteJsonLd } from "@/components/layout/SiteJsonLd";
import { baseOpenGraph, siteConfig } from "@/config/site";
import { CartDrawer } from "@/features/cart";
import { AppProviders } from "@/providers/AppProviders";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: baseOpenGraph,
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-brand-dark">
        <SiteJsonLd />
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
