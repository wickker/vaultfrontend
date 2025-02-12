import { PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'

type ModalProps = {
  isVisible: boolean
  header?: JSX.Element
  footer?: JSX.Element
} & PropsWithChildren

const Modal = ({
  isVisible = false,
  header = <div />,
  footer = <div />,
  children,
}: ModalProps) => {
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
              <div className='grid w-md max-w-md grid-rows-[auto_1fr_auto] overflow-hidden bg-white'>
                {header}

                {children}

                {footer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default Modal
