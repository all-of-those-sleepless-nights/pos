import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"

import AlertStack, {
  type AlertMessage,
  type AlertVariant,
} from "@/components/overlays/alerts/alert-stack"

type AlertPayload = {
  message: string
  title?: string
  variant?: AlertVariant
  durationMs?: number
}

type AlertContextValue = {
  showAlert: (payload: AlertPayload) => void
}

const AlertContext = createContext<AlertContextValue | null>(null)

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertMessage[]>([])
  const timers = useRef<Record<string, number>>({})

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
    if (timers.current[id]) {
      clearTimeout(timers.current[id])
      delete timers.current[id]
    }
  }, [])

  const showAlert = useCallback(
    (payload: AlertPayload) => {
      const id = crypto.randomUUID()
      setAlerts((prev) => [
        ...prev,
        {
          id,
          message: payload.message,
          title: payload.title,
          variant: payload.variant,
        },
      ])

      const timeout = window.setTimeout(
        () => dismissAlert(id),
        payload.durationMs ?? 3500
      )
      timers.current[id] = timeout
    },
    [dismissAlert]
  )

  const value = useMemo(() => ({ showAlert }), [showAlert])

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertStack alerts={alerts} onDismiss={dismissAlert} />
    </AlertContext.Provider>
  )
}

export function useAlert() {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider")
  }
  return context
}
