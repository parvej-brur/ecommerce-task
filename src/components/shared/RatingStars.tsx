import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
  className?: string;
}

const STAR_COUNT = 5;

export function RatingStars({ rating, reviewsCount, className }: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-label={`Rated ${rating} out of 5`}>
      <div className="flex items-center gap-0.5 text-gold-hover" aria-hidden="true">
        {Array.from({ length: STAR_COUNT }, (_, index) => (
          <Star key={index} className={cn("size-3.5", index < Math.round(rating) && "fill-gold-hover")} />
        ))}
      </div>
      {reviewsCount !== undefined && (
        <span className="text-[11px] text-zinc-400">({reviewsCount})</span>
      )}
    </div>
  );
}
