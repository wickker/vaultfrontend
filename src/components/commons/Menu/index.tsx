import { MouseEvent, PropsWithChildren, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'
import { RxCross2 } from 'react-icons/rx'
import useClickOutside from '@/hooks/useClickOutside'
import { mc } from '@/utils/functions/commons'

type MenuProps = {
  isVisible: boolean
  onClose: () => void
  className?: string
  footer?: JSX.Element
} & PropsWithChildren

const Menu = ({
  isVisible = false,
  onClose,
  children,
  className,
  footer,
}: MenuProps) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null)
  useClickOutside(clickOutsideRef, onClose)

  const close = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClose()
  }

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className='fixed inset-0 flex justify-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className='font-noto-sans relative h-full w-md max-w-md bg-[rgba(0,0,0,0.7)]'>
                <motion.div
                  className={mc(
                    'absolute bottom-0 flex h-fit w-full flex-col rounded-t-lg bg-white opacity-100',
                    className
                  )}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.25, ease: 'linear' }}
                  ref={clickOutsideRef}
                >
                  <div className='flex items-center justify-end px-6 pt-6'>
                    <button
                      className='text-app-default hover:cursor-pointer'
                      onClick={close}
                    >
                      <RxCross2 className='h-8 w-8' />
                    </button>
                  </div>

                  <div className='px-6 pb-6'>{children}</div>

                  {footer}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default Menu
