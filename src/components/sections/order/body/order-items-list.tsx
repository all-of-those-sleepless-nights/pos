import { X } from "lucide-react"

import type { EditableOrderField, OrderItem } from "@/constants/types"
import { formatCurrency } from "@/lib/utils"

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
    <div className="flex flex-col">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-16 text-center shadow-sm">
          <p className="text-2xl font-semibold text-neutral-400">
            No items in the order
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Add products from the catalog to start building this order.
          </p>
        </div>
      ) : (
        <div className="space-y-3 pb-32">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:border-neutral-300"
            >
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
                <button
                  type="button"
                  onClick={() => onEditField(item, "quantity")}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-1 text-center font-semibold text-neutral-900"
                  aria-label={`Edit quantity for ${item.name}`}
                >
                  <span className="text-xl font-extrabold">{item.quantity}x</span>
                </button>
                <div className="flex-1 text-left md:text-left">
                  <p className="text-xl font-bold leading-tight text-neutral-900">
                    {item.name}
                  </p>
                  <p className="mt-1 text-base font-medium text-neutral-500">
                    {getBrandName(item.brandId)}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between gap-4 border-t border-dashed border-neutral-200 pt-4 md:w-auto md:border-none md:pt-0">
                  <button
                    type="button"
                    onClick={() => onEditField(item, "totalPrice")}
                    className="text-left md:text-right"
                  >
                    <p className="text-2xl font-bold text-neutral-900 border p-3 border-neutral-400 rounded-xl">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-transparent bg-red-50 text-red-600 transition hover:border-red-200 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
                    aria-label={`Remove ${item.name} from the order`}
                  >
                    <X className="h-6 w-6" aria-hidden="true" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderItemsList
