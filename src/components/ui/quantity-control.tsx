import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

type QuantityControlProps = {
  value: number
  min?: number
  max?: number
  label?: string
  className?: string
  onChange: (value: number) => void
  onValuePress?: () => void
}

function QuantityControl({
  value,
  min = 0,
  max,
  label = "Quantity",
  className,
  onChange,
  onValuePress,
}: QuantityControlProps) {
  const safeMax = typeof max === "number" ? max : Number.POSITIVE_INFINITY
  const safeValue = Math.min(safeMax, Math.max(min, Math.round(value ?? 0)))

  const handleIncrement = () => onChange(Math.min(safeMax, safeValue + 1))
  const handleDecrement = () => onChange(Math.max(min, safeValue - 1))

  return (
    <div
      className={cn(
        "col-span-2 rounded-2xl border border-border bg-neutral-50 p-4 shadow-inner",
        className
      )}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={handleDecrement}
          className="flex h-14 items-center justify-center rounded-2xl border border-border bg-white text-xl font-semibold"
        >
          <Minus className="size-5" />
        </button>
        <button
          type="button"
          onClick={onValuePress}
          className="flex h-14 flex-col items-center justify-center rounded-2xl bg-white text-2xl font-bold shadow"
        >
          {safeValue}
        </button>
        <button
          type="button"
          onClick={handleIncrement}
          className="flex h-14 items-center justify-center rounded-2xl border border-border bg-white text-xl font-semibold"
        >
          <Plus className="size-5" />
        </button>
      </div>
    </div>
  )
}

export default QuantityControl
