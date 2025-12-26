import type { Category } from "@/constants/types"

type CategoryGridProps = {
  categories: Category[]
  selectedId: string | null
  onSelect: (categoryId: string) => void
}

function CategoryGrid({ categories, selectedId, onSelect }: CategoryGridProps) {
  return (
    <div className="grid flex-1 auto-rows-min grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-5">
      {categories.map((category) => {
        const Icon = category.icon
        const isSelected = selectedId === category.id
        return (
          <button
            type="button"
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border text-center text-lg font-semibold transition-all ${
              isSelected
                ? "border-primary bg-primary text-primary-foreground shadow-lg"
                : "border-transparent bg-neutral-100 text-neutral-900 shadow"
            }`}
          >
            <Icon className="size-10" />
            <span className="px-4 text-balance">{category.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryGrid
