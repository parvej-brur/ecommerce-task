import {
  CategorySidebar,
  FlashSaleSection,
  HeroBanner,
  HomeNavRow,
  Newsletter,
  ProductShowcaseSection,
  PromoBanners,
  TrustBadgesBar,
} from "@/features/home";
import { getAllProducts, getProducts } from "@/features/products";

const SHOWCASE_LIMIT = 4;
const FLASH_SALE_LIMIT = 5;

export default async function HomePage() {
  // Artificial delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const [newArrivals, bestSellers] = await Promise.all([
    getProducts({ sort: "newest", page: 1, limit: SHOWCASE_LIMIT }),
    getProducts({ sort: "rating-desc", page: 1, limit: SHOWCASE_LIMIT }),
  ]);
  const flashSaleProducts = getAllProducts()
    .filter((product) => Boolean(product.discount))
    .slice(0, FLASH_SALE_LIMIT);

  return (
    <div className="animate-fade-up">
      <div className="mx-auto max-w-7xl px-6 pt-4">
        <div className="flex items-stretch gap-4">
          <CategorySidebar />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <HomeNavRow />
            <HeroBanner />
          </div>
        </div>
      </div>

      <PromoBanners />
      <FlashSaleSection products={flashSaleProducts} />
      <ProductShowcaseSection
        title="New Arrivals"
        subtitle="Fresh products just for you"
        viewAllHref="/shop?sort=newest"
        products={newArrivals.products}
      />
      <ProductShowcaseSection
        title="Best Sellers"
        subtitle="Most popular products this week"
        viewAllHref="/shop?sort=rating-desc"
        products={bestSellers.products}
      />
      <TrustBadgesBar />
      <Newsletter />
    </div>
  );
}
