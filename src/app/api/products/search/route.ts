import type { NextRequest } from "next/server";
import { searchProducts } from "@/features/products";
import { apiError, apiSuccess } from "@/lib/api/response";
import { withTiming } from "@/lib/api/timing";

// Response depends on the `q` query param; never cache.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";

  try {
    const results = await withTiming(`GET /api/products/search?q=${query}`, () =>
      searchProducts(query),
    );
    // apiSuccess defaults to a 1h public cache; this route's output varies per
    // query string, so the CDN must never cache it.
    return apiSuccess({ query, count: results.length, results }, { cacheControl: "no-store" });
  } catch (error) {
    return apiError(error);
  }
}
