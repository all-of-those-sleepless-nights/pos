import { Button } from "@/components/ui/button"

type ConfirmDialogProps = {
  open: boolean
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
          {message && (
            <p className="text-base text-neutral-600 leading-relaxed">
              {message}
            </p>
          )}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-2xl text-base font-semibold"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            className="h-12 rounded-2xl text-base font-semibold"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
