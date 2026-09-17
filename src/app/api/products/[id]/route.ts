import { getProductById, getRelatedProducts } from "@/features/products";
import { ValidationError } from "@/lib/api/errors";
import { apiError, apiSuccess } from "@/lib/api/response";
import { withTiming } from "@/lib/api/timing";

// Matches the id format `scripts/generate-products.mjs` generates, e.g. `sikdar_a1b2c3d4e5f6`.
const PRODUCT_ID_PATTERN = /^sikdar_[a-z0-9]+$/;

export async function GET(
  _request: Request,
  context: RouteContext<"/api/products/[id]">,
) {
  try {
    const { id } = await context.params;
    if (!PRODUCT_ID_PATTERN.test(id)) {
      throw new ValidationError(`Invalid product id: ${id}`);
    }

    const result = await withTiming(`GET /api/products/${id}`, async () => {
      const product = await getProductById(id);
      const relatedProducts = await getRelatedProducts(id);
      return { product, relatedProducts };
    });

    return apiSuccess(result);
  } catch (error) {
    return apiError(error);
  }
}
