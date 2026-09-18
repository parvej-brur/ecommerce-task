import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const STEP_BUTTON_CLASSES =
  "flex size-10 items-center justify-center rounded-md text-brand-dark transition-colors enabled:cursor-pointer enabled:hover:bg-brand-light-hover disabled:text-zinc-300";

export function QuantityStepper({ value, onChange, min = 1, max = 99, className }: QuantityStepperProps) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center justify-between gap-1 rounded-lg border border-border bg-white p-1",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={STEP_BUTTON_CLASSES}
      >
        <Minus className="size-4" strokeWidth={2.5} />
      </button>
      <span
        className="min-w-10 text-center text-base font-bold text-brand-dark tabular-nums select-none"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={STEP_BUTTON_CLASSES}
      >
        <Plus className="size-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
