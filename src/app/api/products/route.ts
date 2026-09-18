import type { NextRequest } from "next/server";
import { getProducts } from "@/features/products";
import { apiError, apiSuccess } from "@/lib/api/response";
import { withTiming } from "@/lib/api/timing";
import type { FilterParams } from "@/types/api";

// Response depends on query params (category, sort, page, …); never cache.
export const dynamic = "force-dynamic";

function parseFilters(params: URLSearchParams): FilterParams {
  return {
    search: params.get("search") ?? undefined,
    category: params.get("category") ?? undefined,
    sort: params.get("sort") ?? undefined,
    page: params.get("page") ?? undefined,
    limit: params.get("limit") ?? undefined,
    priceMin: params.get("priceMin") ?? undefined,
    priceMax: params.get("priceMax") ?? undefined,
    minRating: params.get("minRating") ?? undefined,
  } as FilterParams;
}

export async function GET(request: NextRequest) {
  try {
    const filters = parseFilters(request.nextUrl.searchParams);
    const result = await withTiming("GET /api/products", () =>
      getProducts(filters),
    );
    return apiSuccess(result);
  } catch (error) {
    return apiError(error);
  }
}
