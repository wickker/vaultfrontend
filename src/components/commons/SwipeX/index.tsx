import {
  ComponentProps,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from 'react'
import { motion, PanInfo, useAnimate } from 'motion/react'
import { BsTrash } from 'react-icons/bs'

const swipeLimit = 140

export type SwipeXRef = {
  reset: () => void
}

type SwipeXProps = {
  onTrigger: () => void
  onRevertTrigger: () => void
} & PropsWithChildren &
  ComponentProps<'div'>

const SwipeX = forwardRef<SwipeXRef, SwipeXProps>(
  ({ children, onTrigger, onRevertTrigger }, ref) => {
    const [isTriggered, setIsTriggered] = useState(false)
    const [swipeRef, animateSwipe] = useAnimate()
    const [scaleRef, animateScale] = useAnimate()

    const vibrate = () => {
      if (!('vibrate' in navigator)) return
      navigator.vibrate(5)
    }

    const handleDrag = (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      const offset = info.offset.x

      if (offset < -swipeLimit && !isTriggered) {
        setIsTriggered(true)
        vibrate()
        setTimeout(onTrigger, 500)
        animateScale(
          scaleRef.current,
          { scale: 700 },
          { duration: 0.4, ease: 'circIn' }
        )
      }

      if (offset >= -swipeLimit && isTriggered) {
        setIsTriggered(false)
        vibrate()
        onRevertTrigger()
        animateScale(
          scaleRef.current,
          { scale: 1 },
          { duration: 0.3, ease: 'circOut' }
        )
      }
    }

    const handleDragEnd = (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      const offset = info.offset.x

      if (offset < -swipeLimit) {
        animateSwipe(swipeRef.current, { x: '-100%' }, { duration: 0.2 })
        return
      }
      animateSwipe(swipeRef.current, { x: 0, opacity: 1 }, { duration: 0.5 })
    }

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          setIsTriggered(false)
          animateSwipe(
            swipeRef.current,
            { x: 0, opacity: 1 },
            { duration: 0.5 }
          )
          animateScale(
            scaleRef.current,
            { scale: 1 },
            { duration: 0.3, ease: 'circOut' }
          )
        },
      }),
      [animateScale, animateSwipe, scaleRef, swipeRef]
    )

    return (
      <div className='grid-stack min-h-[80px] w-full overflow-hidden rounded-md'>
        <div className='bg-app-danger relative flex items-center justify-end rounded-md'>
          <div className='z-10 flex items-center gap-x-2 pr-6 text-sm text-white'>
            <BsTrash className='h-5 w-5' />
            Delete
          </div>

          <motion.div
            ref={scaleRef}
            className='absolute right-12 h-[1px] w-[1px] rounded-full bg-slate-800'
          />
        </div>

        <motion.div
          className='rounded-md bg-white'
          drag='x'
          dragConstraints={{ right: 0 }}
          dragMomentum={false}
          dragElastic={{ left: 0.5 }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          ref={swipeRef}
          whileDrag={{
            pointerEvents: 'none',
          }}
        >
          {children}
        </motion.div>
      </div>
    )
  }
)

export default SwipeX
