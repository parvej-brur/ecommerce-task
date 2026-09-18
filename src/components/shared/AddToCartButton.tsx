"use client";

import { ShoppingCart } from "lucide-react";
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
          <ShoppingCart className="size-3.5" strokeWidth={2.5} />
          Add to Cart
        </>
      ) : (
        "Out of stock"
      )}
    </Button>
  );
}
