import { ComponentProps, forwardRef, PropsWithChildren } from 'react'
import { mc } from '@/utils/functions/commons'

type ChipProps = {
  isActive?: boolean
} & PropsWithChildren &
  ComponentProps<'button'>

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ isActive = false, children, ...props }, ref) => {
    return (
      <button
        className={mc(
          'focus-visible-app inline-flex h-fit w-fit items-center justify-center gap-x-2 rounded-md bg-slate-700 px-2 py-1 text-sm whitespace-nowrap text-white hover:cursor-pointer hover:opacity-95 disabled:pointer-events-none disabled:opacity-50',
          !isActive && 'text-app-default border border-slate-300 bg-white'
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default Chip
