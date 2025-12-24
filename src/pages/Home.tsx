import { useState } from "react"

import ProductDetailOverlay from "@/components/overlays/product-detail/product-detail-overlay"
import NumericKeypad from "@/components/overlays/numeric-keypad/numeric-keypad"
import HomeSection from "@/components/sections/home/home-section"
import OrderSection from "@/components/sections/order/order-section"
import ProductSelectionSection from "@/components/sections/product-selection/product-selection-section"
import type {
  EditableOrderField,
  OrderItem,
  PosSection,
  Product,
  ProductSelectionView,
} from "@/constants/types"
import { categories, products } from "@/constants/mock-data"
import { useAlert } from "@/lib/alert-context"
import { useOrder } from "@/lib/use-order"

const fieldLabels: Record<EditableOrderField, string> = {
  quantity: "Quantity",
  unitPrice: "Unit price",
  totalPrice: "Total price",
}

type KeypadContextState =
  | {
      kind: "order"
      itemId: string
      field: EditableOrderField
      label: string
      value: number
      allowDecimal: boolean
    }
  | {
      kind: "product"
      productId: string
      label: string
      value: number
      allowDecimal: boolean
    }

function HomePage() {
  const [activeSection, setActiveSection] = useState<PosSection>("home")
  const [selectionView, setSelectionView] =
    useState<ProductSelectionView>("categories")
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  )
  const [productSearch, setProductSearch] = useState("")
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>(
    {}
  )
  const [detailProduct, setDetailProduct] = useState<Product | null>(null)
  const [keypadContext, setKeypadContext] = useState<KeypadContextState | null>(
    null
  )

  const {
    items,
    badgeCount,
    orderTotal,
    addProduct,
    updateItem,
    removeItem,
    clearOrder,
  } = useOrder()
  const { showAlert } = useAlert()

  const getProductQuantity = (productId: string) =>
    productQuantities[productId] ?? 0

  const handleCreateOrder = () => {
    setActiveSection("products")
    setSelectionView("categories")
    setSelectedCategoryId(null)
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setSelectionView("products")
    setProductSearch("")
  }

  const handleProductSectionBack = () => {
    if (selectionView === "products") {
      setSelectionView("categories")
      return
    }
    setSelectedCategoryId(null)
    setProductSearch("")
    setActiveSection("home")
  }

  const handleOpenOrder = () => setActiveSection("order")
  const handleBackFromOrder = () => setActiveSection("products")

  const handleDone = () => {
    if (!items.length) {
      return
    }
    clearOrder()
    setActiveSection("home")
    setSelectionView("categories")
    setSelectedCategoryId(null)
    setProductSearch("")
    showAlert({
      title: "Order completed",
      message: "Ticket sent for processing.",
      variant: "success",
    })
  }

  const handleProductDetails = (product: Product) => {
    setDetailProduct(product)
  }

  const handleAddProduct = (product: Product, quantity?: number) => {
    const selectedQuantity = quantity ?? getProductQuantity(product.id)
    if (selectedQuantity <= 0) {
      return
    }
    addProduct(product, selectedQuantity)
    setProductQuantities((prev) => ({
      ...prev,
      [product.id]: 0,
    }))
    setProductSearch("")

    showAlert({
      title: "Product added",
      message:
        selectedQuantity === 1
          ? `${product.name} added to the order.`
          : `${selectedQuantity} × ${product.name} added to the order.`,
      variant: "success",
    })
  }

  const handleClearOrder = () => {
    if (!items.length) {
      return
    }
    clearOrder()
    showAlert({
      title: "Order cleared",
      message: "All items removed from the order.",
      variant: "warning",
    })
  }

  const handleEditField = (item: OrderItem, field: EditableOrderField) => {
    const initialValue =
      field === "quantity"
        ? item.quantity
        : field === "unitPrice"
          ? item.unitPrice
          : item.unitPrice * item.quantity

    setKeypadContext({
      kind: "order",
      itemId: item.id,
      field,
      label: `${fieldLabels[field]} · ${item.name}`,
      value: initialValue,
      allowDecimal: field !== "quantity",
    })
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    const safeQuantity = Math.max(0, Math.round(quantity))
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: safeQuantity,
    }))
  }

  const handleQuantityTap = (product: Product) => {
    setKeypadContext({
      kind: "product",
      productId: product.id,
      label: `Quantity · ${product.name}`,
      value: getProductQuantity(product.id),
      allowDecimal: false,
    })
  }

  const handleKeypadConfirm = (value: number) => {
    if (!keypadContext) return
    if (keypadContext.kind === "order") {
      updateItem(keypadContext.itemId, keypadContext.field, value)
    } else {
      handleQuantityChange(
        keypadContext.productId,
        Math.max(0, Math.round(value))
      )
    }
    setKeypadContext(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <HomeSection
        isActive={activeSection === "home"}
        onCreateOrder={handleCreateOrder}
      />
      <ProductSelectionSection
        isActive={activeSection === "products"}
        categories={categories}
        products={products}
        view={selectionView}
        selectedCategoryId={selectedCategoryId}
        badgeCount={badgeCount}
        onBack={handleProductSectionBack}
        onSelectCategory={handleCategorySelect}
        onAddProduct={handleAddProduct}
        onShowDetails={handleProductDetails}
        onOpenOrder={handleOpenOrder}
        getQuantity={getProductQuantity}
        onQuantityChange={handleQuantityChange}
        onQuantityTap={handleQuantityTap}
        search={productSearch}
        onSearchChange={setProductSearch}
      />
      <OrderSection
        isActive={activeSection === "order"}
        items={items}
        total={orderTotal}
        onBack={handleBackFromOrder}
        onEditField={handleEditField}
        onRemoveItem={removeItem}
        onDone={handleDone}
        onClear={handleClearOrder}
      />

      <ProductDetailOverlay
        product={detailProduct}
        quantity={detailProduct ? getProductQuantity(detailProduct.id) : 0}
        onQuantityChange={(value) => {
          if (!detailProduct) return
          handleQuantityChange(detailProduct.id, value)
        }}
        onQuantityTap={() => {
          if (!detailProduct) return
          handleQuantityTap(detailProduct)
        }}
        onClose={() => setDetailProduct(null)}
        onAdd={(product, quantity) => {
          handleAddProduct(product, quantity)
          setDetailProduct(null)
        }}
      />

      <NumericKeypad
        open={Boolean(keypadContext)}
        label={keypadContext?.label ?? ""}
        initialValue={keypadContext?.value}
        allowDecimal={keypadContext?.allowDecimal}
        onClose={() => setKeypadContext(null)}
        onConfirm={handleKeypadConfirm}
      />
    </div>
  )
}

export default HomePage
