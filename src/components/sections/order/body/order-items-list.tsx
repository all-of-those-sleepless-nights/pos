import { X } from "lucide-react"

import type { EditableOrderField, OrderItem } from "@/constants/types"
import { POS_CURRENCY_SYMBOL } from "@/constants/types"
import { formatCurrency } from "@/lib/utils"

const editableFieldButtonClass =
  "inline-flex w-fit items-center rounded border border-dashed border-primary/40 px-2 py-1 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"

type OrderItemsListProps = {
  items: OrderItem[]
  onEditField: (item: OrderItem, field: EditableOrderField) => void
  getBrandName: (brandId: string) => string
  onRemoveItem: (itemId: string) => void
}

function OrderItemsList({
  items,
  onEditField,
  getBrandName,
  onRemoveItem,
}: OrderItemsListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-8 border-b border-dashed border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
        <span>Qty</span>
        <span className="col-span-4">Item</span>
        <span className="col-span-2 text-right">
          Price ({POS_CURRENCY_SYMBOL})
        </span>
        <span className="text-center"></span>
      </div>
      {items.length === 0 && (
        <div className="flex h-40 items-center justify-center border-b border-dashed text-muted-foreground">
          No items in the order yet
        </div>
      )}
      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-8 items-center border-b border-dashed border-neutral-200 px-4 py-3 text-base"
        >
          <button
            type="button"
            onClick={() => onEditField(item, "quantity")}
            className={`${editableFieldButtonClass} font-semibold text-neutral-900`}
          >
            {item.quantity}
          </button>
          <div className="col-span-4">
            <p className="font-semibold text-neutral-900">{item.name}</p>
            <div className="flex items-center justify-between text-sm text-neutral-500">
              <span>{getBrandName(item.brandId)}</span>
              <button
                type="button"
                onClick={() => onEditField(item, "unitPrice")}
                className={`${editableFieldButtonClass} text-neutral-700`}
              >
                Unit: {formatCurrency(item.unitPrice)}
              </button>
            </div>
          </div>
          <div className="col-span-2 flex justify-end font-semibold text-neutral-900">
            <button
              type="button"
              onClick={() => onEditField(item, "totalPrice")}
              className={`${editableFieldButtonClass} text-right`}
            >
              {formatCurrency(item.unitPrice * item.quantity)}
            </button>
          </div>
          <div className="col-span-1 flex justify-center">
            <button
              type="button"
              onClick={() => onRemoveItem(item.id)}
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-transparent text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label={`Remove ${item.name} from the order`}
              title="Remove item"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderItemsList
