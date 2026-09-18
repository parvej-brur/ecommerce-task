import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { RATING_OPTIONS } from "../utils/filterOptions";

interface RatingOptionLabelProps {
  option: (typeof RATING_OPTIONS)[number];
  active: boolean;
  className?: string;
}

export function RatingOptionLabel({
  option,
  active,
  className,
}: RatingOptionLabelProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-1",
        active ? "font-semibold text-brand-dark" : "text-zinc-600",
        className,
      )}
      aria-label={option.label}
    >
      {option.stars !== null ? (
        <>
          <span className="flex items-center gap-0.5 text-gold" aria-hidden="true">
            {option.stars}
            <Star className="size-3.5 fill-gold" />
          </span>
          <span aria-hidden="true">& Up</span>
        </>
      ) : (
        option.label
      )}
    </span>
  );
}
