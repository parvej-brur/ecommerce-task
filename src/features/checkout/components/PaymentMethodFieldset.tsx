import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormField } from "@/components/forms/FormField";
import { cn } from "@/lib/utils/cn";
import type { CheckoutFormValues } from "../schemas/checkout.schema";
import {
  MERCHANT_PROVIDER_LABELS,
  MERCHANT_PROVIDERS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_METHODS,
  type MerchantProvider,
  type PaymentMethod,
} from "../utils/paymentMethods";
import { PaymentLogo, type PaymentBrand } from "@/components/ui/PaymentLogo";
import { QrPreviewGraphic } from "./QrPreviewGraphic";

interface PaymentMethodFieldsetProps {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  paymentMethod: PaymentMethod;
  merchantProvider?: MerchantProvider;
  disabled?: boolean;
}

const METHOD_LOGOS: Record<PaymentMethod, PaymentBrand[]> = {
  card: ["visa", "mastercard", "paypal"],
  merchant: ["bkash", "nagad", "upay"],
  cod: [],
  "bangla-qr": ["bangla-qr"],
};

const METHOD_LOGO_SIZE: Record<PaymentMethod, "sm" | "xl"> = {
  card: "sm",
  merchant: "sm",
  cod: "sm",
  "bangla-qr": "xl",
};

function CheckBadge() {
  return (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white ring-2 ring-white">
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

export function PaymentMethodFieldset({
  register,
  errors,
  paymentMethod,
  merchantProvider,
  disabled,
}: PaymentMethodFieldsetProps) {
  return (
    <fieldset
      disabled={disabled}
      className="grid gap-4 rounded-xl border border-border bg-white p-6"
    >
      <legend className="sr-only">Payment Method</legend>
      <div className="mb-0.5 text-base font-bold text-brand-dark">
        Payment Method
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = paymentMethod === method;
          return (
            <label
              key={method}
              className={cn(
                "relative flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl border p-4 text-center transition-all",
                isSelected
                  ? "border-brand bg-brand-light shadow-sm"
                  : "border-border hover:border-brand/40 hover:shadow-sm",
              )}
            >
              {isSelected ? <CheckBadge /> : null}
              <input
                type="radio"
                value={method}
                className="sr-only"
                {...register("paymentMethod")}
              />
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {METHOD_LOGOS[method].length > 0 ? (
                  METHOD_LOGOS[method].map((brand) => (
                    <PaymentLogo key={brand} brand={brand} size={METHOD_LOGO_SIZE[method]} />
                  ))
                ) : (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1b6d44"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <rect x="2" y="6" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                )}
              </div>
              {PAYMENT_METHOD_LABELS[method] === "Cash on Delivery" && (
                <span
                  className={cn(
                    "text-xs font-semibold",
                    isSelected ? "text-brand-dark" : "text-zinc-600",
                  )}
                >
                  {PAYMENT_METHOD_LABELS[method]}
                </span>
              )}
            </label>
          );
        })}
      </div>
      {errors.paymentMethod ? (
        <p className="text-xs text-danger">{errors.paymentMethod.message}</p>
      ) : null}

      {paymentMethod === "card" ? (
        <div className="grid gap-3.5 border-t border-border pt-4">
          <FormField
            id="cardNumber"
            label="Card Number"
            inputMode="numeric"
            maxLength={16}
            placeholder="4242424242424242"
            className="font-mono tracking-wide"
            error={errors.cardNumber?.message}
            {...register("cardNumber")}
          />
          <div className="grid grid-cols-2 gap-3.5">
            <FormField
              id="cardExpiry"
              label="Expiry (MM/YY)"
              placeholder="12/28"
              maxLength={5}
              className="font-mono"
              error={errors.cardExpiry?.message}
              {...register("cardExpiry")}
            />
            <FormField
              id="cardCVC"
              label="CVC"
              inputMode="numeric"
              maxLength={4}
              placeholder="123"
              className="font-mono"
              error={errors.cardCVC?.message}
              {...register("cardCVC")}
            />
          </div>
        </div>
      ) : null}

      {paymentMethod === "merchant" ? (
        <div className="grid gap-4 border-t border-border pt-4">
          <div>
            <div className="mb-2 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
              Choose Provider
            </div>
            <div className="grid grid-cols-3 gap-3">
              {MERCHANT_PROVIDERS.map((provider) => {
                const isSelected = merchantProvider === provider;
                return (
                  <label
                    key={provider}
                    className={cn(
                      "relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all",
                      isSelected
                        ? "border-brand bg-brand-light shadow-sm"
                        : "border-border hover:border-brand/40 hover:shadow-sm",
                    )}
                  >
                    {isSelected ? <CheckBadge /> : null}
                    <input
                      type="radio"
                      value={provider}
                      className="sr-only"
                      {...register("merchantProvider")}
                    />
                    <PaymentLogo brand={provider} size="md" />
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        isSelected ? "text-brand-dark" : "text-zinc-600",
                      )}
                    >
                      {MERCHANT_PROVIDER_LABELS[provider]}
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.merchantProvider ? (
              <p className="mt-1.5 text-xs text-danger">
                {errors.merchantProvider.message}
              </p>
            ) : null}
          </div>
          <FormField
            id="merchantNumber"
            label={`${merchantProvider ? MERCHANT_PROVIDER_LABELS[merchantProvider] : "Wallet"} Account Number`}
            inputMode="numeric"
            maxLength={11}
            placeholder="01XXXXXXXXX"
            className="font-mono"
            error={errors.merchantNumber?.message}
            {...register("merchantNumber")}
          />
        </div>
      ) : null}

      {paymentMethod === "cod" ? (
        <p className="border-t border-border pt-4 text-xs text-zinc-500">
          Pay with cash when your order arrives at your doorstep.
        </p>
      ) : null}

      {paymentMethod === "bangla-qr" ? (
        <div className="flex flex-col items-center gap-3 border-t border-border pt-4 text-center">
          <QrPreviewGraphic />
          <p className="max-w-xs text-xs text-zinc-500 pt-1.5">
            Scan with your banking app to pay via the Bangla QR interoperable
            network.
          </p>
        </div>
      ) : null}
    </fieldset>
  );
}
