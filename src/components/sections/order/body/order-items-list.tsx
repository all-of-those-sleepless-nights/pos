import type { EditableOrderField, OrderItem } from "@/constants/types"
import { POS_CURRENCY_SYMBOL } from "@/constants/types"
import { formatCurrency } from "@/lib/utils"

type OrderItemsListProps = {
  items: OrderItem[]
  onEditField: (item: OrderItem, field: EditableOrderField) => void
}

function OrderItemsList({ items, onEditField }: OrderItemsListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-7 border-b border-dashed border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
        <span>Qty</span>
        <span className="col-span-4">Item</span>
        <span className="col-span-2 text-right">
          Price ({POS_CURRENCY_SYMBOL})
        </span>
      </div>
      {items.length === 0 && (
        <div className="flex h-40 items-center justify-center border-b border-dashed text-muted-foreground">
          No items in the order yet
        </div>
      )}
      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-7 items-center border-b border-dashed border-neutral-200 px-4 py-3 text-base"
        >
          <button
            type="button"
            onClick={() => onEditField(item, "quantity")}
            className="text-left font-semibold text-neutral-900"
          >
            {item.quantity}
          </button>
          <div className="col-span-4">
            <p className="font-semibold text-neutral-900">{item.name}</p>
            <p className="text-sm text-neutral-500">
              Unit: {formatCurrency(item.unitPrice)}
            </p>
          </div>
          <div className="col-span-2 text-right font-semibold text-neutral-900">
            <button
              type="button"
              onClick={() => onEditField(item, "totalPrice")}
              className="w-full text-right"
            >
              {formatCurrency(item.unitPrice * item.quantity)}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderItemsList
