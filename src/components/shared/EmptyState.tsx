import { Search } from "lucide-react";

interface EmptyStateProps {
  title: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-white px-6 py-16 text-center">
      <Search className="mb-3 size-12 text-[#ccc]" strokeWidth={1.5} />
      <p className="text-base font-bold text-zinc-700">{title}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
