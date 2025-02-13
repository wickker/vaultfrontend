import { PropsWithChildren, useState } from 'react'
import { nanoid } from 'nanoid'
import { ToastContext } from './context'
import { Toast, ToastPayload } from '@/components/commons/Toast/types'

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Array<ToastPayload>>([])

  const add = (message: string, type: Toast) => {
    const id = nanoid()
    setToasts((prev) => [...prev, { message, id, type }])
    setTimeout(() => {
      remove(id)
    }, 5000)
  }

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))

  const toast = {
    error: (mesasge: string) => add(mesasge, Toast.ERROR),
    warn: (mesasge: string) => add(mesasge, Toast.WARNING),
    success: (mesasge: string) => add(mesasge, Toast.SUCCESS),
    info: (mesasge: string) => add(mesasge, Toast.INFO),
    close: (id: string) => remove(id),
  }

  return (
    <ToastContext.Provider value={{ toast, toasts }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
