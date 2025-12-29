import { useEffect, useMemo, useState } from "react"

import type {
  Brand,
  Category,
  Product,
  ProductSelectionView,
} from "@/constants/types"

import ProductSelectionBody from "./body/product-selection-body"
import ProductSelectionHeader from "./header/product-selection-header"

type ProductSelectionSectionProps = {
  isActive: boolean
  categories: Category[]
  brands: Brand[]
  products: Product[]
  view: ProductSelectionView
  selectedCategoryId: string | null
  selectedBrandId: string | null
  badgeCount: number
  onBack: () => void
  onSelectCategory: (categoryId: string) => void
  onSelectBrand: (brandId: string) => void
  onAddProduct: (product: Product) => void
  onQuickAddProduct: (product: Product) => void
  onOpenOrder: () => void
  search: string
  onSearchChange: (value: string) => void
}

function ProductSelectionSection({
  isActive,
  categories,
  brands,
  products,
  view,
  selectedCategoryId,
  selectedBrandId,
  badgeCount,
  onBack,
  onSelectCategory,
  onSelectBrand,
  onAddProduct,
  onQuickAddProduct,
  onOpenOrder,
  search,
  onSearchChange,
}: ProductSelectionSectionProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const searchEnabled =
    view === "products" && Boolean(selectedCategoryId && selectedBrandId)

  useEffect(() => {
    if (!searchEnabled) {
      setIsSearchVisible(false)
    }
  }, [searchEnabled])

  const brandLookup = useMemo(() => {
    const map = new Map<string, string>()
    brands.forEach((brand) => map.set(brand.id, brand.label))
    return map
  }, [brands])

  const getBrandName = (brandId: string) => brandLookup.get(brandId) ?? "—"

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  )
  const selectedBrand = brands.find((brand) => brand.id === selectedBrandId)

  const title =
    view === "categories"
      ? "Select a category"
      : view === "brands"
        ? selectedCategory?.label ?? "Select brand"
        : selectedBrand?.label ?? "Products"

  return (
    <section
      className={`${
        isActive ? "flex" : "hidden"
      } h-full flex-1 flex-col bg-neutral-50 px-6 py-6`}
    >
      <ProductSelectionHeader
        title={title}
        badgeCount={badgeCount}
        onBack={onBack}
        onOpenOrder={onOpenOrder}
        searchValue={search}
        onSearchChange={onSearchChange}
        showSearchBar={isSearchVisible}
        onToggleSearch={() => setIsSearchVisible((prev) => !prev)}
        searchIconVisible={searchEnabled}
      />
      <div className="mt-6 flex flex-1 flex-col">
        <ProductSelectionBody
          view={view}
          categories={categories}
          brands={brands}
          products={products}
          selectedCategoryId={selectedCategoryId}
          selectedBrandId={selectedBrandId}
          onSelectCategory={onSelectCategory}
          onSelectBrand={onSelectBrand}
          onAddProduct={onAddProduct}
          onQuickAddProduct={onQuickAddProduct}
          getBrandName={getBrandName}
          search={search}
        />
      </div>
    </section>
  )
}

export default ProductSelectionSection
