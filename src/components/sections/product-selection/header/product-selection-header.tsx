import { ArrowLeft, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

type ProductSelectionHeaderProps = {
  title: string
  subtitle?: string
  badgeCount: number
  onBack: () => void
  onOpenOrder: () => void
}

function ProductSelectionHeader({
  title,
  subtitle,
  badgeCount,
  onBack,
  onOpenOrder,
}: ProductSelectionHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
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
          <p className="text-xl font-semibold">{title}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onOpenOrder}
        className="relative flex h-14 items-center gap-3 rounded-2xl bg-neutral-900 px-6 text-lg font-semibold text-white"
      >
        <ShoppingBag className="size-6" />
        Order
        {badgeCount > 0 && (
          <span className="absolute -top-2 -right-2 inline-flex min-h-8 min-w-8 items-center justify-center rounded-full bg-emerald-500 px-2 text-base font-bold text-white">
            {badgeCount}
          </span>
        )}
      </button>
    </header>
  )
}

export default ProductSelectionHeader
