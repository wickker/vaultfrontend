import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ToastContextMethods } from '@/contexts/useToastContext/context'

export const mc = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))

export const getRandomIntInclusive = (min: number, max: number) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

export const getRandomPastelColor = () => {
  const baseColor = {
    r: getRandomIntInclusive(0, 255),
    g: getRandomIntInclusive(0, 255),
    b: getRandomIntInclusive(0, 255),
  }
  const saturation = 0.1
  const white = { r: 255, g: 255, b: 255 }

  const pastelColor = {
    r: Math.round(baseColor.r + (white.r - baseColor.r) * saturation),
    g: Math.round(baseColor.g + (white.g - baseColor.g) * saturation),
    b: Math.round(baseColor.b + (white.b - baseColor.b) * saturation),
  }
  return `rgb(${Object.values(pastelColor).join(', ')})`
}

export const copyToClipboard = async (
  text: string,
  toast: ToastContextMethods
) => {
  const res = await navigator.permissions.query({
    name: 'clipboard-write' as PermissionName,
  })
  if (res.state !== 'granted' && res.state !== 'prompt') {
    toast.error('Browser copy to clipboard functionality is not supported')
    return
  }

  try {
    await navigator.clipboard.writeText(text)
    toast.success('Content copied to clipboard!')
  } catch (err) {
    toast.error(`Failed to copy to clipboard: ${err}`)
  }
}
