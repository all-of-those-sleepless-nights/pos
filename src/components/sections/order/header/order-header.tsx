import { ArrowLeft } from "lucide-react";

import { POS_CURRENCY_SYMBOL } from "@/constants/types";
import { Button } from "@/components/ui/button";

type OrderHeaderProps = {
  itemCount: number;
  total: number;
  onBack: () => void;
};

function OrderHeader({ itemCount, total, onBack }: OrderHeaderProps) {
  return (
    <header className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          className="h-14 rounded-2xl border border-orange-600 bg-orange-500 pl-3 pr-4 text-2xl font-bold text-white shadow-lg transition hover:bg-orange-600 [&_svg]:size-10 hover:text-white"
          onClick={onBack}
        >
          <ArrowLeft />
          Back
        </Button>
        <div>
          <p className="text-[1.58rem] font-semibold">Current Order</p>
          <p className="text-xs text-muted-foreground">
            {itemCount} item{itemCount === 1 ? "" : "s"} · {POS_CURRENCY_SYMBOL}{" "}
            {total.toFixed(2)}
          </p>
        </div>
      </div>
    </header>
  );
}

export default OrderHeader;
