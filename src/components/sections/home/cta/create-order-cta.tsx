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
        size="lg"
        className="h-32 w-[320px] rounded-3xl text-3xl font-semibold tracking-wide shadow-2xl"
        onClick={onCreate}
      >
        <Plus className="size-8" />
        Create Order
      </Button>
    </div>
  )
}

export default CreateOrderCTA
