import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'
import { LiaTimesCircleSolid } from 'react-icons/lia'
import { RxCross2 } from 'react-icons/rx'
import { Button } from '@/components/commons'

type ModalConfirmDeleteProps = {
  isVisible: boolean
  text: string
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}
const ModalConfirmDelete = ({
  isVisible = false,
  onClose,
  onConfirm,
  text = '',
  isLoading = false,
}: ModalConfirmDeleteProps) => {
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
              <div className='font-noto-sans flex w-md max-w-md items-center justify-center overflow-hidden bg-[rgba(0,0,0,0.7)] p-6'>
                <div className='flex h-fit w-full flex-col items-center rounded-md bg-white p-6'>
                  <div className='mb-2 flex w-full items-center justify-end'>
                    <button onClick={onClose}>
                      <RxCross2 className='h-6 w-6' />
                    </button>
                  </div>

                  <LiaTimesCircleSolid className='text-app-danger mb-3 h-20 w-20' />
                  <h1 className='mb-3 text-lg'>Are you sure?</h1>
                  <p className='mb-10 text-center text-sm text-slate-500'>
                    {text}
                  </p>

                  <div className='flex w-full items-center justify-around'>
                    <Button variant='secondary' onClick={onClose}>
                      Cancel
                    </Button>
                    <Button onClick={onConfirm} isLoading={isLoading}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default ModalConfirmDelete
