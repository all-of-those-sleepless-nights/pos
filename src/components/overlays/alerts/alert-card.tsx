import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react"

import { cn } from "@/lib/utils"

export type AlertVariant = "success" | "info" | "warning"

type AlertCardProps = {
  title?: string
  message: string
  variant?: AlertVariant
  onDismiss: () => void
}

const variantStyles: Record<AlertVariant, string> = {
  success: "bg-emerald-600 text-white",
  info: "bg-neutral-900 text-white",
  warning: "bg-amber-600 text-white",
}

const variantIcon: Record<AlertVariant, JSX.Element> = {
  success: <CheckCircle2 className="size-5" />,
  info: <Info className="size-5" />,
  warning: <TriangleAlert className="size-5" />,
}

function AlertCard({
  title,
  message,
  variant = "info",
  onDismiss,
}: AlertCardProps) {
  return (
    <div
      className={cn(
        "flex min-w-[280px] max-w-sm items-start gap-3 rounded-2xl px-4 py-3 shadow-xl",
        variantStyles[variant]
      )}
    >
      <div className="mt-1">{variantIcon[variant]}</div>
      <div className="flex-1">
        {title && <p className="text-sm font-semibold uppercase">{title}</p>}
        <p className="text-base font-medium leading-snug">{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-full p-1 transition hover:bg-white/20"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}

export default AlertCard
