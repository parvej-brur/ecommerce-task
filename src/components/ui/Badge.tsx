import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "success" | "danger" | "warning";
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  neutral: "bg-zinc-100 text-zinc-700",
  success: "bg-brand-light text-brand",
  danger: "bg-danger text-white",
  warning: "bg-gold/20 text-amber-800",
};

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.75 text-[10px] font-bold",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
