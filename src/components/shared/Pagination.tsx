import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const MAX_VISIBLE_PAGES = 5;

function getVisiblePages(current: number, total: number): number[] {
  if (total <= MAX_VISIBLE_PAGES) return Array.from({ length: total }, (_, i) => i + 1);

  const half = Math.floor(MAX_VISIBLE_PAGES / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + MAX_VISIBLE_PAGES - 1);
  start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({ currentPage, totalPages, onPageChange, disabled }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Product pagination" className="mt-7 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage <= 1}
        className="rounded-md border border-border bg-white px-3.5 py-2 font-sans text-[13px] text-zinc-700 hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Prev
      </button>
      {getVisiblePages(currentPage, totalPages).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          disabled={disabled}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "h-9 w-9 rounded-md border font-sans text-[13px] disabled:cursor-not-allowed",
            page === currentPage
              ? "border-brand bg-brand font-bold text-white"
              : "border-border bg-white text-zinc-700 hover:border-brand",
          )}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage >= totalPages}
        className="rounded-md border border-border bg-white px-3.5 py-2 font-sans text-[13px] text-zinc-700 hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </button>
    </nav>
  );
}
