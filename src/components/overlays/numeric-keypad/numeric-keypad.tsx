import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import KeypadGrid from "./keypad-grid"

type NumericKeypadProps = {
  open: boolean
  label: string
  initialValue?: number
  allowDecimal?: boolean
  onClose: () => void
  onConfirm: (value: number) => void
}

function NumericKeypad({
  open,
  label,
  initialValue,
  allowDecimal,
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

  const parsedValue =
    value === "" ? 0 : allowDecimal ? parseFloat(value) : parseInt(value, 10)

  const handleConfirm = () => {
    onConfirm(Number.isNaN(parsedValue) ? 0 : parsedValue)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-2 text-5xl font-semibold">
          {value === "" ? "0" : value}
        </p>
        <div className="mt-6">
          <KeypadGrid
            allowDecimal={allowDecimal}
            onInput={handleInput}
            onBackspace={handleBackspace}
          />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="secondary"
            className="h-14 rounded-2xl text-lg font-semibold"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-14 rounded-2xl text-lg font-semibold"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="h-14 rounded-2xl text-lg font-semibold"
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
