import { Button } from "@/components/ui/button"
import { POS_CURRENCY_SYMBOL } from "@/constants/types"
import { formatCurrency } from "@/lib/utils"

type Totals = {
  quantity: number
  subtotal: number
  tax: number
  rounding: number
  total: number
}

type OrderFooterProps = {
  totals: Totals
  hasItems: boolean
  onDone: () => void
  onClear: () => void
}

function OrderFooter({ totals, hasItems, onDone, onClear }: OrderFooterProps) {
  return (
    <footer className="mt-4 space-y-4 rounded-3xl border border-border bg-white p-4 shadow-lg">
      <div className="space-y-2 rounded-2xl bg-neutral-50 p-4 text-sm">
        <div className="flex justify-between">
          <span className="uppercase tracking-widest text-neutral-500">Qty</span>
          <span className="font-semibold text-neutral-900">{totals.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="uppercase tracking-widest text-neutral-500">Subtotal</span>
          <span className="font-semibold text-neutral-900">
            {formatCurrency(totals.subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="uppercase tracking-widest text-neutral-500">SST (6%)</span>
          <span className="font-semibold text-neutral-900">
            {formatCurrency(totals.tax)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="uppercase tracking-widest text-neutral-500">Bill rounding</span>
          <span className="font-semibold text-neutral-900">
            {formatCurrency(totals.rounding)}
          </span>
        </div>
        <div className="flex justify-between text-base">
          <span className="font-semibold uppercase tracking-widest text-neutral-700">
            Total ({POS_CURRENCY_SYMBOL})
          </span>
          <span className="text-xl font-bold text-neutral-900">
            {formatCurrency(totals.total)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          type="button"
          variant="secondary"
          className="h-14 flex-1 rounded-2xl text-lg font-semibold"
          disabled={!hasItems}
          onClick={onClear}
        >
          Clear Order
        </Button>
        <Button
          type="button"
          className="h-14 flex-1 rounded-2xl text-lg font-semibold"
          disabled={!hasItems}
          onClick={onDone}
        >
          Done
        </Button>
      </div>
    </footer>
  )
}

export default OrderFooter
