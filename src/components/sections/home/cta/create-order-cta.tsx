import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

type CreateOrderCTAProps = {
  onCreate: () => void
}

function CreateOrderCTA({ onCreate }: CreateOrderCTAProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Button
        type="button"
        className="h-28 w-full rounded-3xl text-3xl font-semibold tracking-wide shadow-2xl"
        onClick={onCreate}
      >
        <Plus className="h-[2em] w-[2em]" />
        Create Order
      </Button>
    </div>
  )
}

export default CreateOrderCTA
