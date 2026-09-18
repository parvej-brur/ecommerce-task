"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

// Collapsible group used by the mobile filter drawer. Open by default.
export function FilterSection({ title, children }: FilterSectionProps) {
  const [open, setOpen] = useState(true);
  const panelId = useId();

  return (
    <section className="mb-2">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-3 border-b border-border py-1 text-left"
      >
        <h3 className="-mb-px border-b-2 border-brand-dark py-2 text-base font-extrabold tracking-tight text-brand-dark">
          {title}
        </h3>
        {open ? (
          <Minus
            className="size-4 text-zinc-500"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        ) : (
          <Plus
            className="size-4 text-zinc-500"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        )}
      </button>
      <div id={panelId} hidden={!open} className="py-2">
        {children}
      </div>
    </section>
  );
}
