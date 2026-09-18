"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useToast } from "@/providers/ToastProvider";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/api";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  product: Product;
  quantity?: number;
}

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  ...buttonProps
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addItem({
      productId: product.id,
      quantity,
      price: product.price,
      name: product.title,
      image: product.image,
    });
    showToast("success", "Added to cart");
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!product.inStock}
      className={cn("cursor-pointer", className)}
      {...buttonProps}
    >
      {product.inStock ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Cart
        </>
      ) : (
        "Out of stock"
      )}
    </Button>
  );
}
