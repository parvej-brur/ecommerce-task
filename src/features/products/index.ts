export {
  filterByCategory,
  filterByPrice,
  getProductById,
  getProducts,
  getRelatedProducts,
  searchProducts,
  sortProducts,
} from "./api/products.api";
export { PRODUCT_CATEGORIES, isProductCategory } from "./utils/categories";
export type { ProductCategory } from "./utils/categories";
