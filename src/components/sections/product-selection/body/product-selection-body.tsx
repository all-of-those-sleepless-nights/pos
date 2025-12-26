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
  onAddProduct: (product: Product) => void
  getCategoryName: (categoryId: string) => string
  search: string
}

function ProductSelectionBody({
  view,
  categories,
  products,
  selectedCategoryId,
  onSelectCategory,
  onAddProduct,
  getCategoryName,
  search,
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
          search={search}
          getCategoryName={getCategoryName}
        />
      )}
    </div>
  )
}

export default ProductSelectionBody
