export const Toast = {
  ERROR: 'Error',
  INFO: 'Info',
  SUCCESS: 'Success',
  WARNING: 'Warning',
}

export type Toast = (typeof Toast)[keyof typeof Toast]

export type ToastPayload = {
  id: string
  message: string
  type: Toast
}
