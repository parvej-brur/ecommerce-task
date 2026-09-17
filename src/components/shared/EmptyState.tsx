interface EmptyStateProps {
  title: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-white px-6 py-16 text-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ccc"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="mb-3"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <p className="text-base font-bold text-zinc-700">{title}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
