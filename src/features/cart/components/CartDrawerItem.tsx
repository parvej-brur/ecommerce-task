import Image from "next/image";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useCartStore, type CartItem } from "@/store/cartStore";

export function CartDrawerItem({ item }: { item: CartItem }) {
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-3 border-b border-zinc-100 py-3.5 last:border-b-0">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px] bg-brand-light">
        <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold text-zinc-800">{item.name}</div>
        <div className="mb-2 font-mono text-[13px] text-zinc-500">{formatCurrency(item.price)}</div>
        <div className="inline-flex items-center">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => updateQty(item.productId, item.quantity - 1)}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-l-md border border-border bg-white text-sm text-zinc-600 hover:bg-zinc-50"
          >
            −
          </button>
          <div className="flex h-[30px] w-9 items-center justify-center border-t border-b border-border text-[13px] font-semibold text-zinc-800">
            {item.quantity}
          </div>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => updateQty(item.productId, item.quantity + 1)}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-r-md border border-border bg-white text-sm text-zinc-600 hover:bg-zinc-50"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <span className="font-mono text-sm font-bold text-brand-dark">
          {formatCurrency(item.price * item.quantity)}
        </span>
        <button
          type="button"
          onClick={() => removeItem(item.productId)}
          className="text-[11px] text-danger hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
