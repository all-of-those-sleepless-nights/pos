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
}: ProductSelectionBodyProps) {
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  )
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
          selectedCategoryName={selectedCategory?.label}
          onAdd={onAddProduct}
          onDetails={onShowDetails}
          getQuantity={getQuantity}
          onQuantityChange={onQuantityChange}
          onQuantityTap={onQuantityTap}
        />
      )}
    </div>
  )
}

export default ProductSelectionBody
