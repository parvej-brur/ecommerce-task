import { z } from "zod";
import { MERCHANT_PROVIDERS, PAYMENT_METHODS } from "../utils/paymentMethods";

const CARD_NUMBER_PATTERN = /^\d{16}$/;
const CARD_EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CARD_CVC_PATTERN = /^\d{3,4}$/;
const ZIP_PATTERN = /^\d{4,10}$/;
const MERCHANT_NUMBER_PATTERN = /^01[3-9]\d{8}$/;

export const checkoutSchema = z
  .object({
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
    name: z.string().trim().min(1, "Full name is required"),
    address: z.string().trim().min(1, "Address is required"),
    city: z.string().trim().min(1, "City is required"),
    zip: z.string().trim().regex(ZIP_PATTERN, "Enter a valid ZIP/postal code"),
    paymentMethod: z.enum(PAYMENT_METHODS),
    cardNumber: z.string().trim().optional(),
    cardExpiry: z.string().trim().optional(),
    cardCVC: z.string().trim().optional(),
    merchantProvider: z.enum(MERCHANT_PROVIDERS).optional(),
    merchantNumber: z.string().trim().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.paymentMethod === "card") {
      if (!CARD_NUMBER_PATTERN.test(values.cardNumber ?? "")) {
        ctx.addIssue({ code: "custom", path: ["cardNumber"], message: "Card number must be exactly 16 digits" });
      }
      if (!CARD_EXPIRY_PATTERN.test(values.cardExpiry ?? "")) {
        ctx.addIssue({ code: "custom", path: ["cardExpiry"], message: "Expiry must be in MM/YY format" });
      }
      if (!CARD_CVC_PATTERN.test(values.cardCVC ?? "")) {
        ctx.addIssue({ code: "custom", path: ["cardCVC"], message: "CVC must be 3 or 4 digits" });
      }
    }

    if (values.paymentMethod === "merchant") {
      if (!values.merchantProvider) {
        ctx.addIssue({ code: "custom", path: ["merchantProvider"], message: "Select bKash, Nagad, or Upay" });
      }
      if (!MERCHANT_NUMBER_PATTERN.test(values.merchantNumber ?? "")) {
        ctx.addIssue({
          code: "custom",
          path: ["merchantNumber"],
          message: "Enter a valid Bangladeshi mobile number",
        });
      }
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
