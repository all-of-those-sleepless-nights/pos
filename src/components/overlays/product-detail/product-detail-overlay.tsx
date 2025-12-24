import type { Product } from "@/constants/types"

import ProductDetailCard from "./product-detail-card"

type ProductDetailOverlayProps = {
  product: Product | null
  onClose: () => void
  onAdd: (product: Product, quantity: number) => void
  quantity: number
  onQuantityChange: (value: number) => void
  onQuantityTap: () => void
}

function ProductDetailOverlay({
  product,
  onClose,
  onAdd,
  quantity,
  onQuantityChange,
  onQuantityTap,
}: ProductDetailOverlayProps) {
  if (!product) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()}>
        <ProductDetailCard
          product={product}
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          onQuantityTap={onQuantityTap}
          onAdd={onAdd}
          onClose={onClose}
        />
      </div>
    </div>
  )
}

export default ProductDetailOverlay
