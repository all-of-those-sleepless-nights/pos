import type { EditableOrderField, OrderItem } from "@/constants/types"

import OrderItemsList from "./body/order-items-list"
import OrderFooter from "./footer/order-footer"
import OrderHeader from "./header/order-header"

type OrderSectionProps = {
  isActive: boolean
  items: OrderItem[]
  total: number
  onBack: () => void
  onAddMore: () => void
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
  onAddMore,
  onEditField,
  onRemoveItem,
  onDone,
  onClear,
}: OrderSectionProps) {
  const totals = calculateTotals(items)
  const hasItems = items.length > 0
  const brandLookup = new Map<string, string>()
  items.forEach((item) => {
    if (item.brandId && !brandLookup.has(item.brandId)) {
      brandLookup.set(item.brandId, item.brandName ?? "")
    }
  })
  const getBrandName = (brandId: string) => brandLookup.get(brandId) ?? "—"

  return (
    <section
      className={`relative ${
        isActive ? "flex" : "hidden"
      } h-full flex-1 flex-col bg-neutral-50 px-6 py-6`}
    >
      <div className="flex h-full flex-col">
        <div className="mx-auto w-full">
          <OrderHeader
            itemCount={items.length}
            total={total}
            onBack={onBack}
            onAddMore={onAddMore}
          />
        </div>
        <div className="mt-6 flex-1">
          <div className="mx-auto flex w-full flex-col gap-6">
            <div
              className={`grid grid-cols-1 gap-3`}
            >
              <OrderItemsList
                items={items}
                onEditField={onEditField}
                getBrandName={getBrandName}
                onRemoveItem={onRemoveItem}
              />
              {hasItems && (
                <OrderFooter
                  totals={totals}
                  hasItems={hasItems}
                  onDone={onDone}
                  onClear={onClear}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderSection
