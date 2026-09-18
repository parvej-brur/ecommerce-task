"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";
import { ApiRequestError } from "@/lib/api/client";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useToast } from "@/providers/ToastProvider";
import { useCheckout } from "../hooks/useCheckout";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "../schemas/checkout.schema";
import { PaymentMethodFieldset } from "./PaymentMethodFieldset";

interface CheckoutFormProps {
  total: number;
  onSuccess: (orderId: string) => void;
}

export function CheckoutForm({ total, onSuccess }: CheckoutFormProps) {
  const { showToast } = useToast();
  const checkout = useCheckout();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "card" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await checkout.mutateAsync(values);
      showToast("success", "Order placed successfully!");
      onSuccess(result.orderId);
    } catch (error) {
      const message =
        error instanceof ApiRequestError
          ? error.message
          : "Failed to place your order. Please try again.";
      showToast("error", message);
    }
  });

  const isDisabled = isSubmitting || checkout.isPending;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <fieldset
        disabled={isDisabled}
        className="grid gap-3.5 rounded-xl border border-border bg-white p-6"
      >
        <legend className="sr-only">Contact Information</legend>
        <div className="mb-1 text-base font-bold text-brand-dark">
          Contact Information
        </div>
        <FormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </fieldset>

      <fieldset
        disabled={isDisabled}
        className="grid gap-3.5 rounded-xl border border-border bg-white p-6"
      >
        <legend className="sr-only">Billing Address</legend>
        <div className="mb-1 text-base font-bold text-brand-dark">
          Billing Address
        </div>
        <FormField
          id="name"
          label="Full Name"
          placeholder="Abdullah Al Mamun"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          id="address"
          label="Address"
          placeholder="House 12, Road 5, Dhanmondi"
          error={errors.address?.message}
          {...register("address")}
        />
        <div className="grid grid-cols-2 gap-3.5">
          <FormField
            id="city"
            label="City"
            placeholder="Dhaka"
            error={errors.city?.message}
            {...register("city")}
          />
          <FormField
            id="zip"
            label="ZIP / Postal Code"
            placeholder="1209"
            error={errors.zip?.message}
            {...register("zip")}
          />
        </div>
      </fieldset>

      <PaymentMethodFieldset
        register={register}
        errors={errors}
        paymentMethod={watch("paymentMethod")}
        merchantProvider={watch("merchantProvider")}
        disabled={isDisabled}
      />

      <Button
        type="submit"
        size="lg"
        disabled={isDisabled}
        className="mt-1 w-full py-4"
      >
        {isDisabled
          ? "Placing order…"
          : `Place Order (${formatCurrency(total)})`}
      </Button>
      <p className="text-center text-[11px] text-zinc-500">
        <Shield className="mr-1 -mb-0.5 inline size-3" strokeWidth={2} />
        Your payment is encrypted and secure
      </p>
    </form>
  );
}
