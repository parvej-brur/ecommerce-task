"use client";

import { useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useCartStore } from "@/store/cartStore";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutProgressSteps } from "./CheckoutProgressSteps";
import { OrderConfirmation } from "./OrderConfirmation";
import { OrderSummary } from "./OrderSummary";

export function CheckoutView() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const isHydrated = useIsHydrated();
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isHydrated) {
    return (
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-6 lg:grid-cols-[1fr_380px]" aria-hidden="true">
        <Skeleton className="h-96" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (confirmedOrderId) {
    return <OrderConfirmation orderId={confirmedOrderId} />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-6">
        <EmptyState
          title="Your cart is empty — add items before checking out"
          action={
            <Link href="/" className="text-sm font-semibold text-brand hover:underline">
              Continue shopping
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-6 pb-16">
      <div className="mb-4 flex items-center gap-1.5 text-xs text-zinc-500">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span>›</span>
        <span className="font-semibold text-brand-dark">Checkout</span>
      </div>
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-brand-dark">Checkout</h1>

      <CheckoutProgressSteps currentStep={2} />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]">
        <CheckoutForm
          onSuccess={(orderId) => {
            clearCart();
            setConfirmedOrderId(orderId);
          }}
        />
        <OrderSummary />
      </div>
    </div>
  );
}
