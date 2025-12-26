import { useCallback, useMemo, useState } from "react";

import type { EditableOrderField, OrderItem, Product } from "@/constants/types";

const roundToCurrency = (value: number) =>
  Math.round((Number.isNaN(value) ? 0 : value) * 100) / 100;

export function useOrder() {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addProduct = useCallback((product: Product, quantity = 1) => {
    if (quantity <= 0) {
      return;
    }
    const safeQuantity = Math.round(quantity);

    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        );
      }

      const nextItem: OrderItem = {
        id: crypto.randomUUID(),
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: safeQuantity,
        brandId: product.brandId,
        brandName: product.brandName,
      };
      return [...prev, nextItem];
    });
  }, []);

  const updateItem = useCallback(
    (itemId: string, kind: EditableOrderField, rawValue: number) => {
      setItems((prev) =>
        prev
          .map((item) => {
            if (item.id !== itemId) {
              return item;
            }

            if (kind === "quantity") {
              const safeQuantity = Math.max(1, Math.round(rawValue));
              return { ...item, quantity: safeQuantity };
            }

            if (kind === "unitPrice") {
              return {
                ...item,
                unitPrice: roundToCurrency(Math.max(0, rawValue)),
              };
            }

            const safeQuantity = Math.max(1, item.quantity);
            const nextUnitPrice = safeQuantity
              ? roundToCurrency(rawValue / safeQuantity)
              : roundToCurrency(rawValue);
            return { ...item, unitPrice: nextUnitPrice };
          })
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearOrder = useCallback(() => setItems([]), []);

  const badgeCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const orderTotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + roundToCurrency(item.unitPrice * item.quantity),
        0
      ),
    [items]
  );

  return {
    items,
    badgeCount,
    orderTotal,
    addProduct,
    updateItem,
    removeItem,
    clearOrder,
  };
}
