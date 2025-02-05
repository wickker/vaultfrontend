import { PropsWithChildren } from 'react'
import { RiLoader4Line } from 'react-icons/ri'
import { ButtonVariant } from './types'
import { mc } from '@/utils/functions/commons'

type ButtonProps = {
  className?: string
  icon?: JSX.Element
  variant?: ButtonVariant
  isLoading?: boolean
  isDisabled?: boolean
} & PropsWithChildren

const Button = ({
  children,
  className,
  icon,
  variant = ButtonVariant.DEFAULT,
  isLoading = false,
  isDisabled = false,
}: ButtonProps) => {
  const displayIcon = () => {
    if (isLoading) return <RiLoader4Line className='h-5 w-5 animate-spin' />
    if (icon) return icon
  }

  return (
    <button
      className={mc(
        'focus-visible-app bg-app-default inline-flex h-fit w-fit items-center justify-center gap-x-2 rounded-md px-4 py-2 text-base whitespace-nowrap text-white hover:cursor-pointer hover:opacity-95 disabled:pointer-events-none disabled:opacity-50',
        variant === ButtonVariant.DANGER && 'bg-app-danger',
        variant === ButtonVariant.SECONDARY &&
          'bg-app-secondary text-app-default',
        variant === ButtonVariant.OUTLINE &&
          'text-app-default border border-neutral-300 bg-transparent',
        variant === ButtonVariant.LINK &&
          'text-app-default bg-transparent hover:underline',
        className && className
      )}
      disabled={isDisabled}
    >
      {displayIcon()}
      {children}
    </button>
  )
}

export default Button
