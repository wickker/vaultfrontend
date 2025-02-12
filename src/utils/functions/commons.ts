import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
