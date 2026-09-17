interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({ value, onChange, min = 1, max = 99 }: QuantityStepperProps) {
  return (
    <div className="inline-flex h-12 items-center rounded-lg border border-zinc-300">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-full w-9 items-center justify-center text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium text-zinc-900" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-full w-9 items-center justify-center text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
