import Link from "next/link";

export function OrderConfirmation({ orderId }: { orderId: string }) {
  return (
    <div className="animate-fade-up mx-auto max-w-140 px-6 py-16 text-center">
      <div className="mx-auto mb-6 flex h-18 w-18 items-center justify-center rounded-full border-[3px] border-[#bbf7d0] bg-[#f0fdf4]">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="mb-2 text-[28px] font-extrabold text-brand-dark">Order Confirmed!</h1>
      <p className="mb-1.5 text-sm text-zinc-500">Thank you for your purchase.</p>
      <p className="mb-8 text-[13px] text-zinc-500">
        Order #{orderId} · Confirmation sent to your email.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-lg bg-brand px-7 py-3 text-sm font-bold text-white hover:bg-brand-hover"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
