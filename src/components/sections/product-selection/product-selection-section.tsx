import { useEffect, useMemo, useState } from "react"

import type {
  Category,
  Product,
  ProductSelectionView,
} from "@/constants/types"

import ProductSelectionBody from "./body/product-selection-body"
import ProductSelectionHeader from "./header/product-selection-header"

type ProductSelectionSectionProps = {
  isActive: boolean
  categories: Category[]
  products: Product[]
  view: ProductSelectionView
  selectedCategoryId: string | null
  badgeCount: number
  onBack: () => void
  onSelectCategory: (categoryId: string) => void
  onAddProduct: (product: Product) => void
  onOpenOrder: () => void
  search: string
  onSearchChange: (value: string) => void
}

function ProductSelectionSection({
  isActive,
  categories,
  products,
  view,
  selectedCategoryId,
  badgeCount,
  onBack,
  onSelectCategory,
  onAddProduct,
  onOpenOrder,
  search,
  onSearchChange,
}: ProductSelectionSectionProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const searchEnabled = view === "products" && Boolean(selectedCategoryId)

  useEffect(() => {
    if (!searchEnabled) {
      setIsSearchVisible(false)
    }
  }, [searchEnabled])

  const categoryLookup = useMemo(() => {
    const map = new Map<string, string>()
    categories.forEach((category) => map.set(category.id, category.label))
    return map
  }, [categories])

  const getCategoryName = (categoryId: string) =>
    categoryLookup.get(categoryId) ?? "—"

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  )

  const title =
    view === "categories"
      ? "Select a category"
      : selectedCategory?.label ?? "Products"
  const subtitle =
    view === "categories"
      ? "Browse product categories to begin building an order."
      : "Tap an item to add it with the quantity keypad."

  return (
    <section
      className={`${
        isActive ? "flex" : "hidden"
      } h-full flex-1 flex-col bg-neutral-50 px-6 py-6`}
    >
      <ProductSelectionHeader
        title={title}
        subtitle={subtitle}
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
          products={products}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={onSelectCategory}
          onAddProduct={onAddProduct}
          getCategoryName={getCategoryName}
          search={search}
        />
      </div>
    </section>
  )
}

export default ProductSelectionSection
