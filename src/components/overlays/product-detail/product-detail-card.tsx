import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import QuantityControl from "@/components/ui/quantity-control"
import { formatCurrency } from "@/lib/utils"

import type { Product } from "@/constants/types"

type ProductDetailCardProps = {
  product: Product
  quantity: number
  onQuantityChange: (value: number) => void
  onQuantityTap: () => void
  onAdd: (product: Product, quantity: number) => void
  onClose: () => void
}

function ProductDetailCard({
  product,
  quantity,
  onQuantityChange,
  onQuantityTap,
  onAdd,
  onClose,
}: ProductDetailCardProps) {
  const disableAdd = quantity <= 0

  return (
    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold">{product.name}</p>
          <p className="text-lg text-muted-foreground">
            {formatCurrency(product.price)}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-border p-2 text-muted-foreground"
        >
          <X className="size-5" />
        </button>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <QuantityControl
          value={quantity}
          onChange={onQuantityChange}
          onValuePress={onQuantityTap}
          className="col-span-2"
        />
        <Button
          type="button"
          variant="secondary"
          className="h-16 flex-1 rounded-2xl text-lg font-semibold"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="h-16 flex-1 rounded-2xl text-lg font-semibold"
          disabled={disableAdd}
          onClick={() => onAdd(product, quantity)}
        >
          Add to order
        </Button>
      </div>
    </div>
  )
}

export default ProductDetailCard
