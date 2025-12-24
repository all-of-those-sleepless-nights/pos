import { useEffect, useMemo, useState } from "react";

import { X } from "lucide-react";

import type { Product } from "@/constants/types";

import ProductCard from "./product-card";

type ProductGridProps = {
  products: Product[];
  onAdd: (product: Product, quantity: number) => void;
  onDetails: (product: Product) => void;
  getQuantity: (productId: string) => number;
  onQuantityChange: (productId: string, quantity: number) => void;
  onQuantityTap: (product: Product) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

function ProductGrid({
  products,
  onAdd,
  onDetails,
  getQuantity,
  onQuantityChange,
  onQuantityTap,
  search,
  onSearchChange,
}: ProductGridProps) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);
    return () => window.clearTimeout(handle);
  }, [search]);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) {
      return products;
    }
    const needle = debouncedSearch.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(needle)
    );
  }, [debouncedSearch, products]);

  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-y-auto">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 shadow-sm">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="w-full bg-transparent text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="rounded-full p-1 text-neutral-500 transition hover:bg-neutral-100"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      {!filteredProducts.length && (
        <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed text-lg text-muted-foreground">
          No products found
        </div>
      )}
      {filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={getQuantity(product.id)}
              onQuantityChange={(value) => onQuantityChange(product.id, value)}
              onQuantityTap={() => onQuantityTap(product)}
              onAdd={onAdd}
              onDetails={onDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
