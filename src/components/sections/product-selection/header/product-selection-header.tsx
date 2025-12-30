import { Search, ShoppingBag, X } from "lucide-react"

import BackButton from "@/components/ui/back-button"

type ProductSelectionHeaderProps = {
  title: string
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
          <BackButton onClick={onBack} />
          <div>
            <p className="text-[1.43rem] font-semibold">{title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {searchIconVisible && (
            <button
              type="button"
              onClick={onToggleSearch}
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${showSearchBar ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-900"}`}
              aria-label="Toggle search"
            >
              <Search className="size-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onOpenOrder}
            className="relative flex h-14 items-center gap-2 rounded-2xl bg-neutral-900 px-4 text-2xl font-semibold text-white"
          >
            <ShoppingBag className="size-6 mr-1" />
            Order
            {badgeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-xs font-bold text-white">
                {badgeCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {showSearchBar && (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 shadow-sm">
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products"
            className="flex-1 bg-transparent text-sm font-medium placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onToggleSearch}
            className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
            aria-label="Hide search"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}
    </header>
  )
}

export default ProductSelectionHeader
