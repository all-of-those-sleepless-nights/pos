import type { EditableOrderField, OrderItem } from "@/constants/types"

import OrderItemsList from "./body/order-items-list"
import OrderFooter from "./footer/order-footer"
import OrderHeader from "./header/order-header"

type OrderSectionProps = {
  isActive: boolean
  items: OrderItem[]
  total: number
  onBack: () => void
  onEditField: (item: OrderItem, field: EditableOrderField) => void
  onRemoveItem: (itemId: string) => void
  onDone: () => void
  onClear: () => void
}

function calculateTotals(items: OrderItem[]) {
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  )
  const tax = subtotal * 0.06
  const gross = subtotal + tax
  const roundingIncrement = 0.05
  const roundedTotal = Number(
    (Math.round(gross / roundingIncrement) * roundingIncrement).toFixed(2)
  )
  const rounding = Number((roundedTotal - gross).toFixed(2))

  return {
    quantity,
    subtotal,
    tax,
    rounding,
    total: roundedTotal,
  }
}

function OrderSection({
  isActive,
  items,
  total,
  onBack,
  onEditField,
  onRemoveItem,
  onDone,
  onClear,
}: OrderSectionProps) {
  const totals = calculateTotals(items)
  const brandLookup = new Map<string, string>()
  items.forEach((item) => {
    if (item.brandId && !brandLookup.has(item.brandId)) {
      brandLookup.set(item.brandId, item.brandName ?? "")
    }
  })
  const getBrandName = (brandId: string) => brandLookup.get(brandId) ?? "—"

  return (
    <section
      className={`${
        isActive ? "flex" : "hidden"
      } h-full flex-1 flex-col bg-neutral-50 px-6 py-6`}
    >
      <OrderHeader itemCount={items.length} total={total} onBack={onBack} />
      <div className="mt-6 flex flex-1 flex-col">
        <OrderItemsList
          items={items}
          onEditField={onEditField}
          getBrandName={getBrandName}
          onRemoveItem={onRemoveItem}
        />
        <OrderFooter
          totals={totals}
          hasItems={items.length > 0}
          onDone={onDone}
          onClear={onClear}
        />
      </div>
    </section>
  )
}

export default OrderSection
