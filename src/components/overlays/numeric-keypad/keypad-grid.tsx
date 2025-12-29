import { Delete } from "lucide-react"

type KeypadGridProps = {
  allowDecimal?: boolean
  onInput: (value: string) => void
  onBackspace: () => void
}

const digitKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

function KeypadGrid({ allowDecimal, onInput, onBackspace }: KeypadGridProps) {
  return (
    <div className="grid grid-cols-3 gap-[12px]">
      {digitKeys.map((digit) => (
        <button
          type="button"
          key={digit}
          onClick={() => onInput(digit)}
          className="h-[80px] rounded-[16px] bg-neutral-100 text-[30px] font-semibold"
        >
          {digit}
        </button>
      ))}
      {allowDecimal && (
        <button
          type="button"
          onClick={() => onInput(".")}
          className="h-[80px] rounded-[16px] bg-neutral-100 text-[30px] font-semibold"
        >
          .
        </button>
      )}
      {!allowDecimal && <span className="h-[80px]" aria-hidden="true" />}
      <button
        type="button"
        onClick={() => onInput("0")}
        className="h-[80px] rounded-[16px] bg-neutral-100 text-[30px] font-semibold"
      >
        0
      </button>
      <button
        type="button"
        onClick={onBackspace}
        className="h-[80px] rounded-[16px] bg-neutral-100 text-[30px] font-semibold"
      >
        <Delete className="mx-auto h-[32px] w-[32px]" />
      </button>
    </div>
  )
}

export default KeypadGrid
