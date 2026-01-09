import { useState } from "react"

import NumericKeypad from "@/components/overlays/numeric-keypad/numeric-keypad"
import ConfirmDialog from "@/components/overlays/confirm-dialog/confirm-dialog"
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
import { brands, categories, products } from "@/constants/mock-data"
import { useAlert } from "@/lib/alert-context"
import { useOrder } from "@/lib/use-order"
import { formatCurrency } from "@/lib/utils"

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
      kind: "product-quantity"
      product: Product
      label: string
      value: number
      allowDecimal: boolean
    }
  | {
      kind: "product-total"
      product: Product
      quantity: number
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
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null)
  const [productSearch, setProductSearch] = useState("")
  const [keypadContext, setKeypadContext] = useState<KeypadContextState | null>(
    null
  )
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)

  const {
    items,
    badgeCount,
    orderTotal,
    addProduct,
    reduceProduct,
    updateItem,
    removeItem,
    clearOrder,
  } = useOrder()
  const { showAlert } = useAlert()

  const handleCreateOrder = () => {
    setActiveSection("products")
    setSelectionView("categories")
    setSelectedCategoryId(null)
    setSelectedBrandId(null)
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setSelectedBrandId(null)
    setSelectionView("brands")
    setProductSearch("")
  }

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrandId(brandId)
    setSelectionView("products")
    setProductSearch("")
  }

  const handleProductSectionBack = () => {
    if (selectionView === "products") {
      setSelectionView("brands")
      setProductSearch("")
      return
    }
    if (selectionView === "brands") {
      setSelectionView("categories")
      setSelectedBrandId(null)
      setSelectedCategoryId(null)
      setProductSearch("")
      return
    }
    setSelectedCategoryId(null)
    setSelectedBrandId(null)
    setProductSearch("")
    setActiveSection("home")
  }

  const handleOpenOrder = () => setActiveSection("order")
  const handleBackFromOrder = () => setActiveSection("products")
  const handleAddMoreProducts = () => {
    setActiveSection("products")
    setSelectionView("categories")
    setSelectedCategoryId(null)
    setSelectedBrandId(null)
    setProductSearch("")
  }

  const handleDone = () => {
    if (!items.length) {
      return
    }
    clearOrder()
    setActiveSection("home")
    setSelectionView("categories")
    setSelectedCategoryId(null)
    setSelectedBrandId(null)
    setProductSearch("")
    showAlert({
      title: "Order completed",
      message: "Ticket sent for processing.",
      variant: "success",
    })
  }

  const handleRequestAddProduct = (product: Product) => {
    setKeypadContext({
      kind: "product-quantity",
      product,
      label: `Quantity · ${product.name}`,
      value: 1,
      allowDecimal: false,
    })
  }

  const handleQuickAddProduct = (product: Product) => {
    addProduct(product, 1, product.price)
    showAlert({
      title: "Product added",
      message: `${product.name} added to the order.`,
      variant: "success",
    })
  }

  const handleRequestClearOrder = () => {
    if (!items.length) {
      return
    }
    setIsClearDialogOpen(true)
  }

  const handleConfirmClearOrder = () => {
    clearOrder()
    setIsClearDialogOpen(false)
    showAlert({
      title: "Order cleared",
      message: "All items removed from the order.",
      variant: "warning",
    })
  }

  const handleCancelClearOrder = () => setIsClearDialogOpen(false)

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

  const handleKeypadConfirm = (value: number) => {
    if (!keypadContext) return
    if (keypadContext.kind === "order") {
      updateItem(keypadContext.itemId, keypadContext.field, value)
      setKeypadContext(null)
      return
    }

    if (keypadContext.kind === "product-quantity") {
      const isSubtract = value < 0
      const safeQuantity = Math.max(1, Math.round(Math.abs(value)))
      const signedQuantity = isSubtract ? -safeQuantity : safeQuantity
      const estimatedTotal = Number(
        (keypadContext.product.price * safeQuantity).toFixed(2)
      )
      setKeypadContext({
        kind: "product-total",
        product: keypadContext.product,
        quantity: signedQuantity,
        label: isSubtract
          ? `Deduct · ${keypadContext.product.name}`
          : `Total · ${keypadContext.product.name}`,
        value: estimatedTotal,
        allowDecimal: true,
      })
      return
    }

    if (keypadContext.kind === "product-total") {
      const isSubtract = keypadContext.quantity < 0
      const safeQuantity = Math.abs(keypadContext.quantity)
      const safeTotal = Math.max(0, value)

      if (isSubtract) {
        const found = reduceProduct(
          keypadContext.product,
          safeQuantity,
          safeTotal
        )
        if (found) {
          showAlert({
            title: "Product reduced",
            message:
              safeQuantity === 1
                ? `${keypadContext.product.name} reduced by ${formatCurrency(safeTotal)}.`
                : `${safeQuantity} × ${keypadContext.product.name} reduced by ${formatCurrency(safeTotal)}.`,
            variant: "warning",
          })
        } else {
          showAlert({
            title: "Product not found in order",
            message: `${keypadContext.product.name} is not in the order.`,
            variant: "warning",
          })
        }
      } else {
        addProduct(keypadContext.product, safeQuantity, safeTotal)
        showAlert({
          title: "Product added",
          message:
            safeQuantity === 1
              ? `${keypadContext.product.name} added for ${formatCurrency(safeTotal)}.`
              : `${safeQuantity} × ${keypadContext.product.name} added for ${formatCurrency(safeTotal)}.`,
          variant: "success",
        })
      }
      setKeypadContext(null)
    }
  }

  let keypadValuePrefix: string | undefined
  let showDeductPrefix = false
  if (keypadContext) {
    if (keypadContext.kind === "product-total") {
      keypadValuePrefix = "RM"
      showDeductPrefix = keypadContext.quantity < 0
    } else if (keypadContext.kind === "order" && keypadContext.field !== "quantity") {
      keypadValuePrefix = "RM"
    }
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
        brands={brands}
        products={products}
        view={selectionView}
        selectedCategoryId={selectedCategoryId}
        selectedBrandId={selectedBrandId}
        badgeCount={badgeCount}
        onBack={handleProductSectionBack}
        onSelectCategory={handleCategorySelect}
        onSelectBrand={handleBrandSelect}
        onAddProduct={handleRequestAddProduct}
        onQuickAddProduct={handleQuickAddProduct}
        onOpenOrder={handleOpenOrder}
        search={productSearch}
        onSearchChange={setProductSearch}
      />
      <OrderSection
        isActive={activeSection === "order"}
        items={items}
        total={orderTotal}
        onBack={handleBackFromOrder}
        onAddMore={handleAddMoreProducts}
        onEditField={handleEditField}
        onRemoveItem={removeItem}
        onDone={handleDone}
        onClear={handleRequestClearOrder}
      />

      <NumericKeypad
        open={Boolean(keypadContext)}
        label={keypadContext?.label ?? ""}
        initialValue={keypadContext?.value}
        allowDecimal={keypadContext?.allowDecimal}
        valuePrefix={keypadValuePrefix}
        showQuantityMode={keypadContext?.kind === "product-quantity"}
        showDeductPrefix={showDeductPrefix}
        onClose={() => setKeypadContext(null)}
        onConfirm={handleKeypadConfirm}
      />
      <ConfirmDialog
        open={isClearDialogOpen}
        title="Clear the current order?"
        message="This action will remove every item in the list."
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onCancel={handleCancelClearOrder}
        onConfirm={handleConfirmClearOrder}
      />
    </div>
  )
}

export default HomePage
