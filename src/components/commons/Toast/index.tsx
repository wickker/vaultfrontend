import { AnimatePresence } from 'motion/react'
import { createPortal } from 'react-dom'
import Tile from './Tile'
import { useToastContext } from '@/contexts/useToastContext/context'

const Toast = () => {
  const { toasts, toast } = useToastContext()

  return createPortal(
    <>
      {toasts.length > 0 && (
        <div
          className='fixed top-0 flex w-full justify-center'
          id='modal-toasts'
        >
          <div className='font-noto-sans flex w-md max-w-md flex-col gap-y-2 p-6'>
            <AnimatePresence>
              {toasts.map((t) => (
                <Tile
                  type={t.type}
                  message={t.message}
                  key={t.id}
                  onClose={() => toast.close(t.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}

export default Toast
