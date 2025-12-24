import type { Product } from "@/constants/types"

import ProductCard from "./product-card"

type ProductGridProps = {
  products: Product[]
  selectedCategoryName?: string
  onAdd: (product: Product, quantity: number) => void
  onDetails: (product: Product) => void
  getQuantity: (productId: string) => number
  onQuantityChange: (productId: string, quantity: number) => void
  onQuantityTap: (product: Product) => void
}

function ProductGrid({
  products,
  selectedCategoryName,
  onAdd,
  onDetails,
  getQuantity,
  onQuantityChange,
  onQuantityTap,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed text-lg text-muted-foreground">
        No products available
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto">
      {selectedCategoryName && (
        <div className="rounded-2xl bg-neutral-100 px-4 py-2 text-sm font-medium uppercase tracking-wide text-neutral-600">
          {selectedCategoryName}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
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
    </div>
  )
}

export default ProductGrid
