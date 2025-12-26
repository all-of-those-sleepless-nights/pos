import { ArrowLeft, Search, ShoppingBag, X } from "lucide-react"

import { Button } from "@/components/ui/button"

type ProductSelectionHeaderProps = {
  title: string
  subtitle?: string
  badgeCount: number
  onBack: () => void
  onOpenOrder: () => void
  searchValue: string
  onSearchChange: (value: string) => void
  showSearchBar: boolean
  onToggleSearch: () => void
  searchIconVisible: boolean
}

function ProductSelectionHeader({
  title,
  subtitle,
  badgeCount,
  onBack,
  onOpenOrder,
  searchValue,
  onSearchChange,
  showSearchBar,
  onToggleSearch,
  searchIconVisible,
}: ProductSelectionHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            className="h-14 rounded-2xl border border-border px-6 text-lg"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 size-5" />
            Back
          </Button>
          <div>
            <p className="text-xl font-semibold">{title}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {searchIconVisible && (
            <button
              type="button"
              onClick={onToggleSearch}
              className={`flex h-14 w-14 items-center justify-center rounded-full border transition ${showSearchBar ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-900"}`}
              aria-label="Toggle search"
            >
              <Search className="size-6" />
            </button>
          )}
          <button
            type="button"
            onClick={onOpenOrder}
            className="relative flex h-14 items-center gap-3 rounded-2xl bg-neutral-900 px-6 text-lg font-semibold text-white"
          >
            <ShoppingBag className="size-6" />
            Order
            {badgeCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex min-h-8 min-w-8 items-center justify-center rounded-full bg-emerald-500 px-2 text-base font-bold text-white">
                {badgeCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {showSearchBar && (
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2 shadow-sm">
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products"
            className="flex-1 bg-transparent text-base font-medium placeholder:text-neutral-400 focus:outline-none"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onToggleSearch}
            className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
            aria-label="Hide search"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </header>
  )
}

export default ProductSelectionHeader
