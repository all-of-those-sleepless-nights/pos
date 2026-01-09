import { Delete } from "lucide-react"

type KeypadGridProps = {
  allowDecimal?: boolean
  showQuantityMode?: boolean
  onToggleMode?: () => void
  onInput: (value: string) => void
  onBackspace: () => void
}

const digitKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

function KeypadGrid({
  allowDecimal,
  showQuantityMode,
  onToggleMode,
  onInput,
  onBackspace,
}: KeypadGridProps) {
  return (
    <div className="grid grid-cols-3 gap-[16px]">
      {digitKeys.map((digit) => (
        <button
          type="button"
          key={digit}
          onClick={() => onInput(digit)}
          className="h-[106px] rounded-[22px] bg-neutral-100 text-[38px] font-semibold"
        >
          {digit}
        </button>
      ))}
      {showQuantityMode && onToggleMode && (
        <button
          type="button"
          onClick={onToggleMode}
          className="h-[106px] rounded-[22px] bg-orange-500 text-[32px] font-bold text-white"
        >
         +/−
        </button>
      )}
      {!showQuantityMode && allowDecimal && (
        <button
          type="button"
          onClick={() => onInput(".")}
          className="h-[106px] rounded-[22px] bg-neutral-100 text-[38px] font-semibold"
        >
          .
        </button>
      )}
      {!showQuantityMode && !allowDecimal && (
        <span className="h-[106px]" aria-hidden="true" />
      )}
      <button
        type="button"
        onClick={() => onInput("0")}
        className="h-[106px] rounded-[22px] bg-neutral-100 text-[38px] font-semibold"
      >
        0
      </button>
      <button
        type="button"
        onClick={onBackspace}
        className="h-[106px] rounded-[22px] bg-neutral-100 text-[38px] font-semibold"
      >
        <Delete className="mx-auto h-[40px] w-[40px]" />
      </button>
    </div>
  )
}

export default KeypadGrid
