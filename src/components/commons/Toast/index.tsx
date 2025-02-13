import { AnimatePresence } from 'motion/react'
import Tile from './Tile'
import { useToastContext } from '@/contexts/useToastContext/context'

const Toast = () => {
  const { toasts, toast } = useToastContext()

  return (
    <div className='absolute top-0 flex w-full justify-center'>
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
  )
}

export default Toast
