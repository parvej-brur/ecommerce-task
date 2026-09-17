import { cn } from "@/lib/utils/cn";

const STEPS = ["Information", "Payment", "Confirmation"];

export function CheckoutProgressSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8 flex items-center overflow-x-auto">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const complete = stepNumber <= currentStep;
        return (
          <div key={label} className="flex shrink-0 items-center">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                  complete ? "bg-brand text-white" : "bg-zinc-200 text-zinc-500",
                )}
              >
                {stepNumber}
              </span>
              <span className={cn("text-[13px] font-semibold", complete ? "text-brand-dark" : "text-zinc-400")}>
                {label}
              </span>
            </div>
            {stepNumber < STEPS.length && (
              <div className={cn("mx-3 h-0.5 w-10", stepNumber < currentStep ? "bg-brand" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
