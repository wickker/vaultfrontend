import { mc } from '@/utils/functions/commons'

type AvatarProps = {
  url?: string
  email?: string
  className?: string
}

const getRandomIntInclusive = (min: number, max: number) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

const getRandomPastelColor = () => {
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

const Avatar = ({ url = '', email = '', className }: AvatarProps) => {
  if (url) {
    return (
      <img
        alt='Avatar'
        src={url}
        className={mc('h-24 w-24 rounded-full', className)}
      />
    )
  }

  const bgColor = getRandomPastelColor()
  return (
    <div
      className={mc(
        'flex h-24 w-24 items-center justify-center rounded-full text-app-default text-[36px]',
      className
      )}
      style={{
        backgroundColor: bgColor
      }}
    >
      {email.substring(0, 1).toUpperCase()}
    </div>
  )
}

export default Avatar
