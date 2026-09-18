import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/features/cart";
import { AppProviders } from "@/providers/AppProviders";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sikdar Bazar - Everything you need, delivered to your doorstep",
    template: "%s | Sikdar Bazar",
  },
  description:
    "Shop electronics, fashion, home essentials, books & more — all in one place with free delivery and easy returns.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-brand-dark">
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
