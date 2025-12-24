import { Button } from "@/components/ui/button"
import QuantityControl from "@/components/ui/quantity-control"
import { formatCurrency } from "@/lib/utils"

import type { Product } from "@/constants/types"

type ProductCardProps = {
  product: Product
  quantity: number
  onQuantityChange: (value: number) => void
  onQuantityTap: () => void
  onAdd: (product: Product, quantity: number) => void
  onDetails: (product: Product) => void
}

function ProductCard({
  product,
  quantity,
  onQuantityChange,
  onQuantityTap,
  onAdd,
  onDetails,
}: ProductCardProps) {
  const disableAdd = quantity <= 0

  return (
    <div className="flex min-h-[220px] flex-col justify-between rounded-3xl border border-border bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <p className="text-lg font-semibold leading-tight">{product.name}</p>
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>
      <p className="mt-4 text-2xl font-semibold">
        {formatCurrency(product.price)}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <QuantityControl
          value={quantity}
          onChange={onQuantityChange}
          onValuePress={onQuantityTap}
          className="col-span-2"
        />
        <Button
          type="button"
          variant="secondary"
          className="h-16 rounded-2xl"
          onClick={() => onDetails(product)}
        >
          Details
        </Button>
        <Button
          type="button"
          className="h-16 rounded-2xl"
          disabled={disableAdd}
          onClick={() => onAdd(product, quantity)}
        >
          Add
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
