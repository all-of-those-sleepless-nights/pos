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
    <aside className="h-fit self-start rounded-2xl border border-border bg-white p-6 shadow-sm lg:sticky lg:top-2">
      <div className="space-y-6">
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Total Amount ({POS_CURRENCY_SYMBOL})
              </p>
              <p className="text-4xl font-extrabold text-neutral-900">
                {formatCurrency(totals.total)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowBreakdown((prev) => !prev)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-200"
              aria-expanded={showBreakdown}
              aria-label="Toggle total breakdown"
            >
              <ChevronDown
                className={`size-6 transition ${showBreakdown ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          {showBreakdown && (
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-widest text-neutral-500">
                  Items
                </span>
                <span className="font-semibold text-neutral-900">
                  {totals.quantity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-widest text-neutral-500">
                  Subtotal
                </span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(totals.subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-widest text-neutral-500">
                  SST (6%)
                </span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(totals.tax)}
                </span>
              </div>
              <div className="flex items-center justify-between">
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
        <div className="space-y-2">
          <Button
            type="button"
            variant="ghost"
            className="h-16 w-full rounded-xl bg-neutral-900 text-lg font-bold text-white shadow-lg hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-600"
            disabled={!hasItems}
            onClick={onDone}
          >
            Done
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-16 w-full rounded-xl border-2 border-neutral-200 bg-white text-lg font-bold text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasItems}
            onClick={onClear}
          >
            Clear Order
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default OrderFooter
