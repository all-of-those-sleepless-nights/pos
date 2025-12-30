import { Plus } from "lucide-react"

import { POS_CURRENCY_SYMBOL } from "@/constants/types"
import BackButton from "@/components/ui/back-button"

type OrderHeaderProps = {
  itemCount: number
  total: number
  onBack: () => void
  onAddMore: () => void
}

function OrderHeader({ itemCount, total, onBack, onAddMore }: OrderHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <BackButton onClick={onBack} />
          <div>
            <p className="text-[1.5rem] font-semibold text-neutral-900">
              Current Order
            </p>
            {/* <p className="text-sm font-medium text-neutral-500">
              {itemCount} item{itemCount === 1 ? "" : "s"} · {POS_CURRENCY_SYMBOL}{" "}
              {total.toFixed(2)}
            </p> */}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onAddMore}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-5 text-xl font-bold text-white shadow-lg transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/50"
            aria-label="Add more items"
          >
            <Plus className="size-6" />
            <span className="whitespace-nowrap">Add more</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default OrderHeader
