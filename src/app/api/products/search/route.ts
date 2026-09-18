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
    return apiSuccess({ query, count: results.length, results });
  } catch (error) {
    return apiError(error);
  }
}
