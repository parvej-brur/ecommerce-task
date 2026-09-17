import { apiClient } from "@/lib/api/client";
import type { ApiResponse } from "@/types/api";
import type { CheckoutFormValues } from "../schemas/checkout.schema";

export interface CheckoutOrderResult {
  orderId: string;
}

export async function submitCheckout(values: CheckoutFormValues): Promise<CheckoutOrderResult> {
  const response = await apiClient.post<ApiResponse<CheckoutOrderResult>>("/checkout", values);
  return response.data.data;
}
