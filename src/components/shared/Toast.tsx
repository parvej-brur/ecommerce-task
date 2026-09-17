export interface ToastData {
  id: string;
  variant: "success" | "error";
  message: string;
}

interface ToastProps {
  toast: ToastData;
}

export function Toast({ toast }: ToastProps) {
  return (
    <div
      role="status"
      className="animate-slide-down flex items-center gap-2 rounded-[10px] bg-brand-dark px-5 py-3 font-sans text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
    >
      {toast.variant === "success" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )}
      {toast.message}
    </div>
  );
}
