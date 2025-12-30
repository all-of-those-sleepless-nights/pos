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
  const displayText = title ?? message

  return (
    <div
      className={cn(
        "flex w-fit max-w-md items-center gap-3 rounded-2xl px-5 py-4 text-lg font-semibold uppercase tracking-wide shadow-xl",
        variantStyles[variant]
      )}
    >
      <div className="flex items-center gap-3">
        {variantIcon[variant]}
        <span>{displayText}</span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="ml-auto rounded-full p-1 transition hover:bg-white/20"
        aria-label="Dismiss notification"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}

export default AlertCard
