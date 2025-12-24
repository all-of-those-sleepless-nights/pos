import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

type OrderHeaderProps = {
  itemCount: number
  total: number
  onBack: () => void
}

function OrderHeader({ itemCount, total, onBack }: OrderHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          className="h-14 rounded-2xl border border-border px-6 text-lg"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 size-5" />
          Back
        </Button>
        <div>
          <p className="text-2xl font-semibold">Current Order</p>
          <p className="text-sm text-muted-foreground">
            {itemCount} item{itemCount === 1 ? "" : "s"} ·{" "}
            {formatCurrency(total)}
          </p>
        </div>
      </div>
    </header>
  )
}

export default OrderHeader
