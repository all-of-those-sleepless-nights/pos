import AlertCard, { type AlertVariant } from "./alert-card"

export type { AlertVariant }

export type AlertMessage = {
  id: string
  message: string
  title?: string
  variant?: AlertVariant
}

type AlertStackProps = {
  alerts: AlertMessage[]
  onDismiss: (id: string) => void
}

function AlertStack({ alerts, onDismiss }: AlertStackProps) {
  if (!alerts.length) {
    return null
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {alerts.map((alert) => (
        <div key={alert.id} className="pointer-events-auto">
          <AlertCard
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
            onDismiss={() => onDismiss(alert.id)}
          />
        </div>
      ))}
    </div>
  )
}

export default AlertStack
