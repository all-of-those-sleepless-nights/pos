import type { LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const POS_CURRENCY_CODE = "MYR";
export const POS_CURRENCY_SYMBOL = "RM";

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type PosSection = "home" | "products" | "order";

export type ProductSelectionView = "categories" | "products";

export type EditableOrderField = "quantity" | "unitPrice" | "totalPrice";
