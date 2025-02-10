import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'

type MenuProps = {
  isVisible: boolean
  onClose?: () => void
  onSelect?: () => void
}

const Menu = ({ isVisible }: MenuProps) => {
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
              <div className='relative h-full w-md max-w-md bg-[rgba(0,0,0,0.7)]'>
                <motion.div
                  className='absolute bottom-0 h-[100px] w-full bg-amber-300 opacity-100'
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.25, ease: 'linear' }}
                ></motion.div>
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
