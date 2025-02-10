import { ComponentProps, forwardRef } from 'react'
import { mc } from '@/utils/functions/commons'

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={mc(
          'text-app-default focus-visible-app block w-full rounded-md bg-white p-2.5 text-base',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

export default Input
