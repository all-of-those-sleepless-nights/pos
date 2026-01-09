import { useCallback, useMemo, useState } from "react";

import type { EditableOrderField, OrderItem, Product } from "@/constants/types";

const roundToCurrency = (value: number) =>
  Math.round((Number.isNaN(value) ? 0 : value) * 100) / 100;

export function useOrder() {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addProduct = useCallback(
    (product: Product, quantity = 1, totalOverride?: number) => {
      if (quantity <= 0) {
        return;
      }
      const safeQuantity = Math.max(1, Math.round(quantity));
      const overrideTotal =
        typeof totalOverride === "number" && !Number.isNaN(totalOverride)
          ? Math.max(0, totalOverride)
          : null;

      setItems((prev) => {
        const existing = prev.find((item) => item.productId === product.id);
        if (existing) {
          const combinedQuantity = existing.quantity + safeQuantity;
          const combinedUnitPrice =
            overrideTotal !== null
              ? roundToCurrency(
                  (existing.unitPrice * existing.quantity + overrideTotal) /
                    combinedQuantity
                )
              : existing.unitPrice;

          return prev.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: combinedQuantity,
                  unitPrice: combinedUnitPrice,
                }
              : item
          );
        }

        const fallbackUnitPrice = roundToCurrency(product.price);
        const initialUnitPrice =
          overrideTotal !== null
            ? roundToCurrency(overrideTotal / safeQuantity)
            : fallbackUnitPrice;

        const nextItem: OrderItem = {
          id: crypto.randomUUID(),
          productId: product.id,
          name: product.name,
          unitPrice: initialUnitPrice,
          quantity: safeQuantity,
          brandId: product.brandId,
          brandName: product.brandName,
        };
        return [...prev, nextItem];
      });
    },
    []
  );

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

  const reduceProduct = useCallback(
    (product: Product, quantity = 1, totalOverride?: number) => {
      if (quantity <= 0) {
        return false;
      }
      const safeQuantity = Math.max(1, Math.round(quantity));

      let found = false;
      setItems((prev) => {
        const existing = prev.find((item) => item.productId === product.id);
        if (!existing) {
          return prev;
        }
        found = true;

        const newQuantity = existing.quantity - safeQuantity;
        if (newQuantity <= 0) {
          return prev.filter((item) => item.productId !== product.id);
        }

        const overrideTotal =
          typeof totalOverride === "number" && !Number.isNaN(totalOverride)
            ? Math.max(0, totalOverride)
            : null;

        const newUnitPrice =
          overrideTotal !== null
            ? roundToCurrency(
                (existing.unitPrice * existing.quantity - overrideTotal) /
                  newQuantity
              )
            : existing.unitPrice;

        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: newQuantity,
                unitPrice: Math.max(0, newUnitPrice),
              }
            : item
        );
      });
      return found;
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
    reduceProduct,
    updateItem,
    removeItem,
    clearOrder,
  };
}
