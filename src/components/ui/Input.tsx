import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ invalid, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid}
      className={cn(
        "h-10.5 w-full rounded-lg border bg-white px-3.5 text-sm text-brand-dark placeholder:text-zinc-400",
        "focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/10 focus-visible:outline-none",
        invalid ? "border-danger" : "border-border",
        className,
      )}
      {...props}
    />
  );
}
