import { AlertCircle, Check, Info } from "lucide-react";

export interface ToastData {
  id: string;
  variant: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toast: ToastData;
}

const VARIANT_CLASSES: Record<ToastData["variant"], string> = {
  success: "bg-brand-dark text-white",
  error: "bg-brand-dark text-white",
  info: "border border-border bg-white text-brand-dark",
};

export function Toast({ toast }: ToastProps) {
  return (
    <div
      role="status"
      className={`animate-slide-down flex items-center gap-2 rounded-[10px] px-5 py-3 font-sans text-[13px] font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.2)] ${VARIANT_CLASSES[toast.variant]}`}
    >
      {toast.variant === "success" ? (
        <Check className="size-4 text-[#4ade80]" strokeWidth={2.5} />
      ) : toast.variant === "error" ? (
        <AlertCircle className="size-4 text-[#f87171]" strokeWidth={2.5} />
      ) : (
        <Info className="size-4 text-[#1b6d44]" strokeWidth={2.5} />
      )}
      {toast.message}
    </div>
  );
}
