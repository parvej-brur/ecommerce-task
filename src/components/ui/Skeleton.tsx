import { cn } from "@/lib/utils/cn";

const SKELETON_TONES = {
  neutral: "bg-zinc-200",
  green: "bg-brand/20",
  blue: "bg-blue-100",
  pink: "bg-pink-100",
  tan: "bg-stone-200",
} as const;

export type SkeletonTone = keyof typeof SKELETON_TONES;

export function Skeleton({
  className,
  tone = "neutral",
}: {
  className?: string;
  tone?: SkeletonTone;
}) {
  return <div className={cn("animate-pulse rounded-md", SKELETON_TONES[tone], className)} />;
}
