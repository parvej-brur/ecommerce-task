import type { Metadata } from "next";
import { WishlistView } from "@/features/wishlist";

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "Products you've saved for later.",
  robots: { index: false },
};

export default function WishlistPage() {
  return <WishlistView />;
}
