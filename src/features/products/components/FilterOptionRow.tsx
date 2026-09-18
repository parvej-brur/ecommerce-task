import { cn } from "@/lib/utils/cn";

interface FilterOptionRowProps {
  name: string;
  checked: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}

export function FilterOptionRow({
  name,
  checked,
  onSelect,
  children,
}: FilterOptionRowProps) {
  return (
    <label
      className={cn(
        "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-1 text-[15px] active:bg-brand-light",
        checked ? "font-semibold text-brand-dark" : "text-zinc-600",
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="size-5 shrink-0 accent-brand"
      />
      {children}
    </label>
  );
}
