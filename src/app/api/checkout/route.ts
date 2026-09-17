import type { NextRequest } from "next/server";
import { checkoutSchema } from "@/features/checkout";
import { ValidationError } from "@/lib/api/errors";
import { apiError, apiSuccess } from "@/lib/api/response";
import { withTiming } from "@/lib/api/timing";

// Mock checkout endpoint — simulates order processing without a real payment provider.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues[0]?.message ?? "Invalid checkout details");
    }

    const orderId = await withTiming("POST /api/checkout", async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return `ORD-${Date.now().toString(36).toUpperCase()}`;
    });

    return apiSuccess({ orderId }, { cacheControl: false });
  } catch (error) {
    return apiError(error);
  }
}
