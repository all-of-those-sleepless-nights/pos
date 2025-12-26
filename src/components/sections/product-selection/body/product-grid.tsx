import { useEffect, useMemo, useState } from "react"

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

import type { Product } from "@/constants/types"

type SortKey = "name" | "brand" | "price"

type ProductGridProps = {
  products: Product[]
  onAdd: (product: Product) => void
  getBrandName: (brandId: string) => string
  search: string
}

const sortIcons: Record<"asc" | "desc", JSX.Element> = {
  asc: <ArrowUp className="size-4" />,
  desc: <ArrowDown className="size-4" />,
}

function ProductGrid({ products, onAdd, getBrandName, search }: ProductGridProps) {
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" }>(
    {
      key: "name",
      direction: "asc",
    }
  )

  useEffect(() => {
    const handle = window.setTimeout(() => setDebouncedSearch(search), 250)
    return () => window.clearTimeout(handle)
  }, [search])

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) {
      return products
    }
    const needle = debouncedSearch.toLowerCase()
    return products.filter((product) =>
      product.name.toLowerCase().includes(needle)
    )
  }, [debouncedSearch, products])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    sorted.sort((a, b) => {
      const direction = sortConfig.direction === "asc" ? 1 : -1
      switch (sortConfig.key) {
        case "name":
          return a.name.localeCompare(b.name) * direction
        case "brand":
          return getBrandName(a.brandId)
            .localeCompare(getBrandName(b.brandId)) * direction
        case "price":
          return (a.price - b.price) * direction
        default:
          return 0
      }
    })
    return sorted
  }, [filteredProducts, sortConfig, getBrandName])

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    )
  }

  const renderSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="size-4 text-neutral-400" />
    }
    return sortIcons[sortConfig.direction]
  }

  return (
    <div className="flex-1 overflow-auto rounded-xl border border-border bg-white shadow">
      <table className="min-w-full divide-y divide-neutral-200 text-left">
        <thead className="bg-neutral-50">
          <tr>
            {([
              { key: "name", label: "Name", align: "text-left" },
              { key: "brand", label: "Brand", align: "text-left" },
              { key: "price", label: "Price", align: "text-right" },
            ] as const).map((column) => (
              <th key={column.key} className={`px-4 py-3 ${column.align}`}>
                <button
                  type="button"
                  onClick={() => handleSort(column.key)}
                  className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-neutral-600"
                >
                  {column.label}
                  {renderSortIcon(column.key)}
                </button>
              </th>
            ))}
            <th className="px-4 py-3 text-right text-sm font-semibold uppercase tracking-wide text-neutral-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {sortedProducts.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-12 text-center text-lg text-muted-foreground"
              >
                No products found
              </td>
            </tr>
          )}
          {sortedProducts.map((product) => (
            <tr key={product.id} className="hover:bg-neutral-50/60">
              <td className="px-4 py-3 text-base font-semibold text-neutral-900">
                {product.name}
              </td>
              <td className="px-4 py-3 text-base text-neutral-600">
                {getBrandName(product.brandId)}
              </td>
              <td className="px-4 py-3 text-right text-base font-semibold">
                {formatCurrency(product.price)}
              </td>
              <td className="px-4 py-3 text-right">
                <Button
                  type="button"
                  className="h-11 rounded-2xl px-6"
                  onClick={() => onAdd(product)}
                >
                  Add
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductGrid
