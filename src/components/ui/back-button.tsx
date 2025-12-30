import { ArrowLeft } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
}

function BackButton({ label = "Back", className, ...props }: BackButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "inline-flex h-14 items-center gap-2 rounded-2xl border border-orange-600 bg-orange-500 px-5 text-2xl font-bold text-white shadow-lg transition hover:bg-orange-600 hover:text-white [&_svg]:size-6",
        className
      )}
      {...props}
    >
      <ArrowLeft className="size-6" />
      {label}
    </Button>
  )
}

export default BackButton
