import type {
  Category,
  Product,
  ProductSelectionView,
} from "@/constants/types"

import CategoryGrid from "./category-grid"
import ProductGrid from "./product-grid"

type ProductSelectionBodyProps = {
  view: ProductSelectionView
  categories: Category[]
  products: Product[]
  selectedCategoryId: string | null
  onSelectCategory: (categoryId: string) => void
  onAddProduct: (product: Product, quantity: number) => void
  onShowDetails: (product: Product) => void
  getQuantity: (productId: string) => number
  onQuantityChange: (productId: string, quantity: number) => void
  onQuantityTap: (product: Product) => void
  search: string
  onSearchChange: (value: string) => void
}

function ProductSelectionBody({
  view,
  categories,
  products,
  selectedCategoryId,
  onSelectCategory,
  onAddProduct,
  onShowDetails,
  getQuantity,
  onQuantityChange,
  onQuantityTap,
  search,
  onSearchChange,
}: ProductSelectionBodyProps) {
  const currentProducts =
    view === "products"
      ? products.filter((product) => product.categoryId === selectedCategoryId)
      : []

  return (
    <div className="flex flex-1 flex-col gap-6">
      {view === "categories" ? (
        <>
          <p className="text-lg font-medium text-muted-foreground">
            Choose a category to load matching menu items.
          </p>
          <CategoryGrid
            categories={categories}
            selectedId={selectedCategoryId}
            onSelect={onSelectCategory}
          />
        </>
      ) : (
        <ProductGrid
          products={currentProducts}
          onAdd={onAddProduct}
          onDetails={onShowDetails}
          getQuantity={getQuantity}
          onQuantityChange={onQuantityChange}
          onQuantityTap={onQuantityTap}
          search={search}
          onSearchChange={onSearchChange}
        />
      )}
    </div>
  )
}

export default ProductSelectionBody
