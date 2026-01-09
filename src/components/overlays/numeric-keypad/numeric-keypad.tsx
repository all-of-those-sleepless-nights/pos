import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import KeypadGrid from "./keypad-grid"

type NumericKeypadProps = {
  open: boolean
  label: string
  initialValue?: number
  allowDecimal?: boolean
  valuePrefix?: string
  showQuantityMode?: boolean
  showDeductPrefix?: boolean
  onClose: () => void
  onConfirm: (value: number) => void
}

function NumericKeypad({
  open,
  label,
  initialValue,
  allowDecimal,
  valuePrefix,
  showQuantityMode,
  showDeductPrefix,
  onClose,
  onConfirm,
}: NumericKeypadProps) {
  const [value, setValue] = useState("")
  const [isAddMode, setIsAddMode] = useState(true)

  useEffect(() => {
    if (open) {
      setValue(
        typeof initialValue === "number" && !Number.isNaN(initialValue)
          ? String(initialValue)
          : ""
      )
      setIsAddMode(true)
    }
  }, [initialValue, open])

  if (!open) {
    return null
  }

  const handleInput = (char: string) => {
    setValue((current) => {
      if (char === "." && (!allowDecimal || current.includes("."))) {
        return current
      }
      if (char === "." && current === "") {
        return "0."
      }
      if (current === "0" && char !== ".") {
        return char
      }
      return `${current}${char}`
    })
  }

  const handleBackspace = () => {
    setValue((current) => current.slice(0, -1))
  }

  const handleClear = () => setValue("")

  const parsedValue =
    value === "" ? 0 : allowDecimal ? parseFloat(value) : parseInt(value, 10)

  const handleConfirm = () => {
    const baseValue = Number.isNaN(parsedValue) ? 0 : parsedValue
    const finalValue = showQuantityMode && !isAddMode ? -baseValue : baseValue
    onConfirm(finalValue)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-[16px] md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] rounded-[32px] bg-white p-[32px] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-[16px] uppercase tracking-[0.38em] text-muted-foreground">
          {label}
        </p>
        <div className="mt-[14px] flex items-baseline justify-center gap-3 text-[52px] font-semibold">
          {showQuantityMode && (
            <span className="text-[36px] self-center text-muted-foreground">
              {isAddMode ? "+" : "−"}
            </span>
          )}
          {showDeductPrefix && (
            <span className="text-[36px] self-center text-muted-foreground">
              −
            </span>
          )}
          {valuePrefix && (
            <span className="text-[36px] uppercase tracking-widest text-muted-foreground">
              {valuePrefix}
            </span>
          )}
          <span className="text-[64px] tabular-nums">
            {value === "" ? "0" : value}
          </span>
        </div>
        <div className="mt-[32px]">
          <KeypadGrid
            allowDecimal={allowDecimal}
            showQuantityMode={showQuantityMode}
            onToggleMode={() => setIsAddMode((prev) => !prev)}
            onInput={handleInput}
            onBackspace={handleBackspace}
          />
        </div>
        <div className="mt-[24px] grid grid-cols-3 gap-[16px]">
          <Button
            type="button"
            variant="secondary"
            className="h-[106px] rounded-[22px] text-[28px] font-semibold"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-[106px] rounded-[22px] text-[28px] font-semibold"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="h-[106px] rounded-[22px] text-[28px] font-semibold"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NumericKeypad
