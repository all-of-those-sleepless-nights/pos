import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type Totals = {
  quantity: number;
  subtotal: number;
  tax: number;
  rounding: number;
  total: number;
};

type OrderFooterProps = {
  totals: Totals;
  hasItems: boolean;
  onDone: () => void;
  onClear: () => void;
};

function OrderFooter({ totals, hasItems, onDone }: OrderFooterProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <aside className="fixed bottom-0 left-0 w-full self-start border border-border bg-white p-6 shadow-lg">
      <div className="flex items-center justify-end gap-3">
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowBreakdown(true)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-200"
              aria-label="Show order breakdown"
            >
              <ChevronDown className="size-6" />
            </button>
            <div>
              {/* <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Total Amount ({POS_CURRENCY_SYMBOL})
              </p> */}
              <p className="text-4xl font-extrabold text-neutral-900">
                {formatCurrency(totals.total)}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Button
            type="button"
            variant="ghost"
            className="px-8 py-6 h-fit w-fit rounded-xl bg-neutral-900 text-3xl font-bold text-white shadow-lg hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-600"
            disabled={!hasItems}
            onClick={onDone}
          >
            Done
          </Button>
          {/* <Button
            type="button"
            variant="ghost"
            className="h-16 w-full rounded-xl border-2 border-neutral-200 bg-white text-lg font-bold text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasItems}
            onClick={onClear}
          >
            Clear Order
          </Button> */}
        </div>
      </div>
      {showBreakdown && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 pt-16"
          onClick={() => setShowBreakdown(false)}
        >
          <div
            className="mx-auto w-full bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="text-center">
              <p className="text-base font-semibold uppercase tracking-widest text-neutral-500">
                Order breakdown
              </p>
              <p className="mt-1 text-3xl font-extrabold text-neutral-900">
                {formatCurrency(totals.total)}
              </p>
            </div>
            <div className="mt-6 space-y-4 text-base">
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-widest text-neutral-500">
                  Items
                </span>
                <span className="font-semibold text-neutral-900">
                  {totals.quantity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-widest text-neutral-500">
                  Subtotal
                </span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(totals.subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-widest text-neutral-500">
                  SST (6%)
                </span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(totals.tax)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-widest text-neutral-500">
                  Bill rounding
                </span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(totals.rounding)}
                </span>
              </div>
            </div>
            <Button
              type="button"
              className="mt-6 px-8 py-6 h-fit w-full rounded-2xl text-3xl font-semibold"
              onClick={() => setShowBreakdown(false)}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default OrderFooter;
