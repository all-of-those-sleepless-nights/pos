import type { LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const POS_CURRENCY_CODE = "MYR";
export const POS_CURRENCY_SYMBOL = "RM";

export type Brand = {
  id: string;
  label: string;
  categoryId: string;
  icon: LucideIcon;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  brandId: string;
  brandName: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  brandId: string;
  brandName: string;
};

export type PosSection = "home" | "products" | "order";

export type ProductSelectionView = "categories" | "brands" | "products";

export type EditableOrderField = "quantity" | "unitPrice" | "totalPrice";
