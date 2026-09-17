import { z } from "zod";

const CARD_NUMBER_PATTERN = /^\d{16}$/;
const CARD_EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CARD_CVC_PATTERN = /^\d{3,4}$/;
const ZIP_PATTERN = /^\d{4,10}$/;

export const checkoutSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  name: z.string().trim().min(1, "Full name is required"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  zip: z.string().trim().regex(ZIP_PATTERN, "Enter a valid ZIP/postal code"),
  cardNumber: z
    .string()
    .trim()
    .regex(CARD_NUMBER_PATTERN, "Card number must be exactly 16 digits"),
  cardExpiry: z
    .string()
    .trim()
    .regex(CARD_EXPIRY_PATTERN, "Expiry must be in MM/YY format"),
  cardCVC: z.string().trim().regex(CARD_CVC_PATTERN, "CVC must be 3 or 4 digits"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
