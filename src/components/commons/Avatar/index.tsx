import { getRandomPastelColor, mc } from '@/utils/functions/commons'

type AvatarProps = {
  url?: string
  email?: string
  className?: string
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
        'text-app-default flex h-24 w-24 items-center justify-center rounded-full text-[36px]',
        className
      )}
      style={{
        backgroundColor: bgColor,
      }}
    >
      {email.substring(0, 1).toUpperCase()}
    </div>
  )
}

export default Avatar
