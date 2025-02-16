import { createContext, useContext } from 'react'
import { ToastPayload } from '@/components/commons/Toast/types'

export type ToastContextMethods = {
  error: (m: string) => void
  warn: (m: string) => void
  success: (m: string) => void
  info: (m: string) => void
  close: (id: string) => void
}

type ToastContextSchema = {
  toast: ToastContextMethods
  toasts: Array<ToastPayload>
}

export const ToastContext = createContext<ToastContextSchema>({
  toast: {
    error: () => {},
    warn: () => {},
    success: () => {},
    info: () => {},
    close: () => {},
  },
  toasts: [],
})

export const useToastContext = () => useContext(ToastContext)
