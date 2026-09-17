import { cn } from "@/lib/utils/cn";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-10.5 w-full rounded-lg border border-border bg-white px-3.5 text-sm text-brand-dark",
        "focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/10 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
