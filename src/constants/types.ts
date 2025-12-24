import type { LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  description?: string;
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
