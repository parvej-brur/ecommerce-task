export interface StockStatus {
  dotColor: string;
  textColor: string;
  bgColor: string;
  label: string;
}

export function getStockStatus(product: { inStock: boolean; stock: number }): StockStatus {
  if (!product.inStock || product.stock <= 0) {
    return { dotColor: "bg-danger", textColor: "text-danger", bgColor: "bg-red-50", label: "Out of Stock" };
  }
  if (product.stock <= 10) {
    return {
      dotColor: "bg-gold-hover",
      textColor: "text-amber-700",
      bgColor: "bg-amber-50",
      label: `Only ${product.stock} left`,
    };
  }
  return { dotColor: "bg-brand", textColor: "text-brand", bgColor: "bg-brand-light", label: "In Stock" };
}
