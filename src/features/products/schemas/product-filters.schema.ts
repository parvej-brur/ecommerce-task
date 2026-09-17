import { z } from "zod";

export const SORT_OPTIONS = [
  "price-asc",
  "price-desc",
  "rating-desc",
  "newest",
] as const;

export const productFiltersSchema = z
  .object({
    search: z.string().trim().min(1).optional(),
    category: z.string().trim().min(1).optional(),
    sort: z.enum(SORT_OPTIONS).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    priceMin: z.coerce.number().min(0).optional(),
    priceMax: z.coerce.number().min(0).optional(),
    minRating: z.coerce.number().min(0).max(5).optional(),
  })
  .refine(
    (value) =>
      value.priceMin === undefined ||
      value.priceMax === undefined ||
      value.priceMin <= value.priceMax,
    {
      message: "priceMin must be less than or equal to priceMax",
      path: ["priceMin"],
    },
  );

export type ProductFiltersInput = z.input<typeof productFiltersSchema>;
