export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  inStock: boolean;
  category: string;
  image: string;
  sku: string;
  tags: string[];
  relatedIds: string[];
  // ISO 8601 timestamp — what "newest" sorting orders by.
  createdAt: string;
}

export type SortOption = "price-asc" | "price-desc" | "rating-desc" | "newest";

export interface FilterParams {
  search?: string;
  category?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
  priceMin?: number;
  priceMax?: number;
  minRating?: number;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  statusCode: number;
}
