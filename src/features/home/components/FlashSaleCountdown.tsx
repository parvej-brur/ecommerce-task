"use client";

import { useEffect, useState } from "react";

const FLASH_SALE_DURATION_MS = 3 * 60 * 60 * 1000;

function formatSegment(ms: number, divisor: number): string {
  return String(Math.floor(ms / divisor) % (divisor === 1000 ? 60 : 24)).padStart(2, "0");
}

export function FlashSaleCountdown() {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    const endsAt = Date.now() + FLASH_SALE_DURATION_MS;
    const tick = () => setRemainingMs(Math.max(0, endsAt - Date.now()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = remainingMs == null ? "00" : String(Math.floor(remainingMs / 3_600_000)).padStart(2, "0");
  const minutes = remainingMs == null ? "00" : formatSegment(remainingMs % 3_600_000, 60_000);
  const seconds = remainingMs == null ? "00" : formatSegment(remainingMs % 60_000, 1000);

  return (
    <div className="flex gap-1 sm:ml-auto" aria-label="Flash sale ends in">
      <span className="min-w-9 rounded-md bg-brand-dark px-2.5 py-1.5 text-center font-mono text-sm font-bold text-white">
        {hours}
      </span>
      <span className="px-0.5 text-lg font-bold text-brand-dark">:</span>
      <span className="min-w-9 rounded-md bg-brand-dark px-2.5 py-1.5 text-center font-mono text-sm font-bold text-white">
        {minutes}
      </span>
      <span className="px-0.5 text-lg font-bold text-brand-dark">:</span>
      <span className="min-w-9 rounded-md bg-danger px-2.5 py-1.5 text-center font-mono text-sm font-bold text-white">
        {seconds}
      </span>
    </div>
  );
}
