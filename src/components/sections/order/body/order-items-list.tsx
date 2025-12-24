import type { EditableOrderField, OrderItem } from "@/constants/types"

import OrderItemRow from "./order-item-row"

type OrderItemsListProps = {
  items: OrderItem[]
  onEditField: (item: OrderItem, field: EditableOrderField) => void
  onRemove: (itemId: string) => void
}

function OrderItemsList({
  items,
  onEditField,
  onRemove,
}: OrderItemsListProps) {
  if (!items.length) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed text-lg text-muted-foreground mb-44 md:mb-36">
        No items in the order yet
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto pr-1 mb-44 md:mb-36">
      {items.map((item) => (
        <OrderItemRow
          key={item.id}
          item={item}
          onEditField={onEditField}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

export default OrderItemsList
