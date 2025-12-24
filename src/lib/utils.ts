import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(
    Number.isNaN(value) ? 0 : value ?? 0
  )
}
