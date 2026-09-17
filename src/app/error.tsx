"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-xl font-semibold text-zinc-900">Something went wrong</h1>
      {error.digest ? <p className="text-sm text-zinc-500">Reference: {error.digest}</p> : null}
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
