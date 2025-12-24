import { Delete } from "lucide-react"

type KeypadGridProps = {
  allowDecimal?: boolean
  onInput: (value: string) => void
  onBackspace: () => void
}

const digitKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

function KeypadGrid({ allowDecimal, onInput, onBackspace }: KeypadGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {digitKeys.map((digit) => (
        <button
          type="button"
          key={digit}
          onClick={() => onInput(digit)}
          className="h-20 rounded-2xl bg-neutral-100 text-3xl font-semibold"
        >
          {digit}
        </button>
      ))}
      {allowDecimal && (
        <button
          type="button"
          onClick={() => onInput(".")}
          className="h-20 rounded-2xl bg-neutral-100 text-3xl font-semibold"
        >
          .
        </button>
      )}
      {!allowDecimal && <span className="h-20" aria-hidden="true" />}
      <button
        type="button"
        onClick={() => onInput("0")}
        className="h-20 rounded-2xl bg-neutral-100 text-3xl font-semibold"
      >
        0
      </button>
      <button
        type="button"
        onClick={onBackspace}
        className="h-20 rounded-2xl bg-neutral-100 text-3xl font-semibold"
      >
        <Delete className="mx-auto size-8" />
      </button>
    </div>
  )
}

export default KeypadGrid
