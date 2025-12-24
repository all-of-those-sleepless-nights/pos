import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type OrderFooterProps = {
  total: number;
  hasItems: boolean;
  onDone: () => void;
  onClear: () => void;
};

function OrderFooter({ total, hasItems, onDone, onClear }: OrderFooterProps) {
  return (
    <footer className="flex flex-col gap-4 border border-border bg-white p-4 shadow-lg fixed bottom-0 left-0 w-full">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-muted-foreground">
          Total due
        </span>
        <span className="text-3xl font-semibold">{formatCurrency(total)}</span>
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          type="button"
          variant="secondary"
          className="h-16 flex-1 rounded-2xl text-lg font-semibold"
          disabled={!hasItems}
          onClick={onClear}
        >
          Clear Order
        </Button>
        <Button
          type="button"
          className="h-16 flex-1 rounded-2xl text-lg font-semibold"
          disabled={!hasItems}
          onClick={onDone}
        >
          Done
        </Button>
      </div>
    </footer>
  );
}

export default OrderFooter;
