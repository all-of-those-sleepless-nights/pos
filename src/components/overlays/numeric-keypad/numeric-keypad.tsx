import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import KeypadGrid from "./keypad-grid"

type NumericKeypadProps = {
  open: boolean
  label: string
  initialValue?: number
  allowDecimal?: boolean
  valuePrefix?: string
  showIncrementButtons?: boolean
  onClose: () => void
  onConfirm: (value: number) => void
}

function NumericKeypad({
  open,
  label,
  initialValue,
  allowDecimal,
  valuePrefix,
  showIncrementButtons,
  onClose,
  onConfirm,
}: NumericKeypadProps) {
  const [value, setValue] = useState("")

  useEffect(() => {
    if (open) {
      setValue(
        typeof initialValue === "number" && !Number.isNaN(initialValue)
          ? String(initialValue)
          : ""
      )
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

  const handleDecrement = () => {
    setValue((current) => {
      const currentNum = current === "" ? 0 : allowDecimal ? parseFloat(current) : parseInt(current, 10)
      const newValue = Math.max(0, currentNum - 1)
      return newValue === 0 ? "" : String(newValue)
    })
  }

  const handleIncrement = () => {
    setValue((current) => {
      const currentNum = current === "" ? 0 : allowDecimal ? parseFloat(current) : parseInt(current, 10)
      return String(currentNum + 1)
    })
  }

  const parsedValue =
    value === "" ? 0 : allowDecimal ? parseFloat(value) : parseInt(value, 10)

  const handleConfirm = () => {
    onConfirm(Number.isNaN(parsedValue) ? 0 : parsedValue)
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
        <div className="mt-[14px] flex items-center justify-center gap-4">
          {showIncrementButtons && (
            <button
              type="button"
              className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 active:bg-gray-300"
              onClick={handleDecrement}
            >
              <Minus className="h-8 w-8" />
            </button>
          )}
          <div className="flex items-baseline gap-3 text-[52px] font-semibold">
            {valuePrefix && (
              <span className="text-[36px] uppercase tracking-widest text-muted-foreground">
                {valuePrefix}
              </span>
            )}
            <span className="text-[64px] tabular-nums">
              {value === "" ? "0" : value}
            </span>
          </div>
          {showIncrementButtons && (
            <button
              type="button"
              className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 active:bg-gray-300"
              onClick={handleIncrement}
            >
              <Plus className="h-8 w-8" />
            </button>
          )}
        </div>
        <div className="mt-[32px]">
          <KeypadGrid
            allowDecimal={allowDecimal}
            onInput={handleInput}
            onBackspace={handleBackspace}
          />
        </div>
        <div className="mt-[24px] grid grid-cols-2 gap-[16px]">
          {/* <Button
            type="button"
            variant="secondary"
            className="h-[106px] rounded-[22px] text-[28px] font-semibold"
            onClick={handleClear}
          >
            Clear
          </Button> */}
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
