import type { Brand } from "@/constants/types"

import CategoryGrid from "./category-grid"

type BrandGridProps = {
  brands: Brand[]
  selectedId: string | null
  onSelect: (brandId: string) => void
}

function BrandGrid({ brands, selectedId, onSelect }: BrandGridProps) {
  return (
    <CategoryGrid categories={brands} selectedId={selectedId} onSelect={onSelect} />
  )
}

export default BrandGrid
