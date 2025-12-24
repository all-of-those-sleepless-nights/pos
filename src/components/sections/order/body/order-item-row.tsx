import { Trash2 } from "lucide-react"

import type { EditableOrderField, OrderItem } from "@/constants/types"
import { formatCurrency } from "@/lib/utils"

type OrderItemRowProps = {
  item: OrderItem
  onEditField: (item: OrderItem, field: EditableOrderField) => void
  onRemove: (itemId: string) => void
}

const editableFields: EditableOrderField[] = [
  "quantity",
  "unitPrice",
  "totalPrice",
]

function OrderItemRow({ item, onEditField, onRemove }: OrderItemRowProps) {
  const total = item.unitPrice * item.quantity

  return (
    <div className="rounded-3xl border border-border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-semibold leading-tight">{item.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(item.unitPrice)} each
          </p>
        </div>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="rounded-xl border border-border p-2 text-muted-foreground transition hover:text-destructive"
        >
          <Trash2 className="size-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {editableFields.map((field) => (
          <button
            type="button"
            key={field}
            onClick={() => onEditField(item, field)}
            className="flex flex-col items-start rounded-2xl border border-dashed px-4 py-3 text-left"
          >
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {field === "quantity"
                ? "Quantity"
                : field === "unitPrice"
                  ? "Unit price"
                  : "Total"}
            </span>
            <span className="text-2xl font-semibold">
              {field === "quantity"
                ? item.quantity
                : field === "unitPrice"
                  ? formatCurrency(item.unitPrice)
                  : formatCurrency(total)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default OrderItemRow
