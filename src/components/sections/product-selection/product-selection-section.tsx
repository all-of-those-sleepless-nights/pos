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
  onAddProduct: (product: Product, quantity: number) => void
  onShowDetails: (product: Product) => void
  onOpenOrder: () => void
  getQuantity: (productId: string) => number
  onQuantityChange: (productId: string, quantity: number) => void
  onQuantityTap: (product: Product) => void
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
  onShowDetails,
  onOpenOrder,
  getQuantity,
  onQuantityChange,
  onQuantityTap,
}: ProductSelectionSectionProps) {
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
      : "Tap an item to add it quickly or open details for modifiers."

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
      />
      <div className="mt-6 flex flex-1 flex-col">
        <ProductSelectionBody
          view={view}
          categories={categories}
          products={products}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={onSelectCategory}
          onAddProduct={onAddProduct}
          onShowDetails={onShowDetails}
          getQuantity={getQuantity}
          onQuantityChange={onQuantityChange}
          onQuantityTap={onQuantityTap}
        />
      </div>
    </section>
  )
}

export default ProductSelectionSection
