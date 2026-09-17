"use client";

import { useMutation } from "@tanstack/react-query";
import { submitCheckout } from "../api/checkout.queries";

export function useCheckout() {
  return useMutation({ mutationFn: submitCheckout });
}
