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
      <div className="flex text-gold-hover tracking-tighter" aria-hidden="true">
        {Array.from({ length: STAR_COUNT }, (_, index) => (
          <span key={index}>{index < Math.round(rating) ? "★" : "☆"}</span>
        ))}
      </div>
      {reviewsCount !== undefined && (
        <span className="text-[11px] text-zinc-400">({reviewsCount})</span>
      )}
    </div>
  );
}
