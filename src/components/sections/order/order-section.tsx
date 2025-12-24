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
  return (
    <section
      className={`${
        isActive ? "flex" : "hidden"
      } h-full flex-1 flex-col bg-neutral-50 px-6 py-6 relative`}
    >
      <OrderHeader itemCount={items.length} total={total} onBack={onBack} />
      <div className="mt-6 flex flex-1 flex-col">
        <OrderItemsList
          items={items}
          onEditField={onEditField}
          onRemove={onRemoveItem}
        />
        <OrderFooter
          total={total}
          hasItems={items.length > 0}
          onDone={onDone}
          onClear={onClear}
        />
      </div>
    </section>
  )
}

export default OrderSection
