import type {
  Brand,
  Category,
  Product,
  ProductSelectionView,
} from "@/constants/types";

import BrandGrid from "./brand-grid";
import CategoryGrid from "./category-grid";
import ProductGrid from "./product-grid";

type ProductSelectionBodyProps = {
  view: ProductSelectionView;
  categories: Category[];
  brands: Brand[];
  products: Product[];
  selectedCategoryId: string | null;
  selectedBrandId: string | null;
  onSelectCategory: (categoryId: string) => void;
  onSelectBrand: (brandId: string) => void;
  onAddProduct: (product: Product) => void;
  onQuickAddProduct: (product: Product) => void;
  getBrandName: (brandId: string) => string;
  search: string;
};

function ProductSelectionBody({
  view,
  categories,
  brands,
  products,
  selectedCategoryId,
  selectedBrandId,
  onSelectCategory,
  onSelectBrand,
  onAddProduct,
  onQuickAddProduct,
  getBrandName,
  search,
}: ProductSelectionBodyProps) {
  const filteredBrands = brands.filter(
    (brand) => brand.categoryId === selectedCategoryId
  );
  const currentProducts =
    view === "products"
      ? products.filter(
          (product) =>
            product.categoryId === selectedCategoryId &&
            product.brandId === selectedBrandId
        )
      : [];

  return (
    <div className="flex flex-1 flex-col gap-6">
      {view === "categories" && (
        <CategoryGrid
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={onSelectCategory}
        />
      )}

      {view === "brands" && (
        <BrandGrid
          brands={filteredBrands}
          selectedId={selectedBrandId}
          onSelect={onSelectBrand}
        />
      )}

      {view === "products" && (
        <ProductGrid
          products={currentProducts}
          onAdd={onAddProduct}
          onQuickAdd={onQuickAddProduct}
          search={search}
          getBrandName={getBrandName}
        />
      )}
    </div>
  );
}

export default ProductSelectionBody;
