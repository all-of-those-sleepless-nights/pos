import { X } from "lucide-react"

import type { EditableOrderField, OrderItem } from "@/constants/types"
import { POS_CURRENCY_SYMBOL } from "@/constants/types"
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
      <div className="hidden md:grid grid-cols-[120px_1fr_160px] gap-6 px-2 pb-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
        <div className="text-center">Qty</div>
        <div>Item details</div>
        <div className="text-right">Price ({POS_CURRENCY_SYMBOL})</div>
      </div>
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
        <div className="space-y-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:border-neutral-300"
            >
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <button
                  type="button"
                  onClick={() => onEditField(item, "quantity")}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-3 text-center font-semibold text-neutral-900 shadow-sm transition hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-label={`Edit quantity for ${item.name}`}
                >
                  <span className="text-3xl font-extrabold">{item.quantity}</span>
                </button>
                <div className="flex-1 text-left md:text-left">
                  <p className="text-xl font-bold leading-tight text-neutral-900">
                    {item.name}
                  </p>
                  <p className="mt-1 text-base font-medium text-neutral-500">
                    {getBrandName(item.brandId)}
                  </p>
                  <button
                    type="button"
                    onClick={() => onEditField(item, "unitPrice")}
                    className="mt-3 inline-flex items-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <span className="text-neutral-500">Unit:</span>
                    {formatCurrency(item.unitPrice)}
                  </button>
                </div>
                <div className="flex w-full items-center justify-between gap-4 border-t border-dashed border-neutral-200 pt-4 md:w-auto md:border-none md:pt-0">
                  <button
                    type="button"
                    onClick={() => onEditField(item, "totalPrice")}
                    className="text-left md:text-right"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                      Total
                    </p>
                    <p className="text-2xl font-bold text-neutral-900">
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
