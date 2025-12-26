import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { POS_CURRENCY_CODE } from "@/constants/types"

const currencyFormatter = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: POS_CURRENCY_CODE,
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
