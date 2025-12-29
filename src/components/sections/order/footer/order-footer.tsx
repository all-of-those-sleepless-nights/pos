import { useState } from "react"

import { ChevronDown } from "lucide-react"

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
  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <footer className="mt-4 space-y-4 rounded-3xl border border-border bg-white p-4 shadow-lg">
      <div className="space-y-2 rounded-2xl bg-neutral-50 p-5 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold uppercase tracking-widest text-neutral-700">
              Total ({POS_CURRENCY_SYMBOL})
            </span>
            <p className="text-3xl font-extrabold text-neutral-900">
              {formatCurrency(totals.total)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowBreakdown((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-border p-2 text-sm font-semibold text-neutral-900 bg-white"
            aria-expanded={showBreakdown}
          >
            <ChevronDown
              className={`size-8 transition ${showBreakdown ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        {showBreakdown && (
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="uppercase tracking-widest text-neutral-500">Qty</span>
              <span className="font-semibold text-neutral-900">
                {totals.quantity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="uppercase tracking-widest text-neutral-500">
                Subtotal
              </span>
              <span className="font-semibold text-neutral-900">
                {formatCurrency(totals.subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="uppercase tracking-widest text-neutral-500">
                SST (6%)
              </span>
              <span className="font-semibold text-neutral-900">
                {formatCurrency(totals.tax)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="uppercase tracking-widest text-neutral-500">
                Bill rounding
              </span>
              <span className="font-semibold text-neutral-900">
                {formatCurrency(totals.rounding)}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          type="button"
          variant="secondary"
          className="h-12 flex-1 rounded-xl text-base font-semibold"
          disabled={!hasItems}
          onClick={onClear}
        >
          Clear Order
        </Button>
        <Button
          type="button"
          className="h-12 flex-1 rounded-xl text-base font-semibold"
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
