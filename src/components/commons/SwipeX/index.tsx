import {
  ComponentProps,
  forwardRef,
  MouseEvent,
  PropsWithChildren,
  TouchEvent,
  useImperativeHandle,
  useState,
} from 'react'
import { BsTrash } from 'react-icons/bs'
import { mc } from '@/utils/functions/commons'

const swipeLimit = 140

export type SwipeXRef = {
  reset: () => void
}

type SwipeXProps = {
  onClick: () => void
  onTrigger: () => void
  onRevertTrigger: () => void
} & PropsWithChildren &
  ComponentProps<'div'>

const SwipeX = forwardRef<SwipeXRef, SwipeXProps>(
  ({ onClick, children, onTrigger, onRevertTrigger }, ref) => {
    const [initial, setInitial] = useState(0)
    const [delta, setDelta] = useState(0)
    const [isTriggered, setIsTriggered] = useState(false)

    const isEditButton = (e: Element) =>
      (e as Element).matches('button') ||
      (e as Element).matches('svg') ||
      (e as Element).matches('path')

    const handleMouseUp = (e: MouseEvent<HTMLDivElement>) =>
      handleEnd(e.target as Element, e.pageX)

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) =>
      handleEnd(e.target as Element, e.changedTouches[0].clientX)

    const handleEnd = (e: Element, x: number) => {
      if (isEditButton(e)) {
        return
      }
      if (x === initial) {
        onClick()
        return
      }

      if (delta >= -swipeLimit) {
        setDelta(0)
      }
    }

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (e.buttons !== 1) return
      handleMove(e.pageX)
    }

    const handleMove = (currentX: number) => {
      let delta = initial - currentX
      delta = delta * -1

      if (delta > 0) {
        delta = 0
      }

      if (delta < -swipeLimit) {
        delta = -500
        setIsTriggered(true)
        onTrigger()
      }

      if (isTriggered && delta >= -swipeLimit) {
        setIsTriggered(false)
        onRevertTrigger()
      }

      setDelta(delta)
    }

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          setInitial(0)
          setDelta(0)
          setIsTriggered(false)
        },
      }),
      []
    )

    return (
      <div className='grid-stack min-h-[80px] w-full overflow-hidden rounded-md'>
        <div className='bg-app-danger relative flex items-center justify-end rounded-md'>
          <div className='z-10 flex items-center gap-x-2 pr-6 text-sm text-white'>
            <BsTrash className='h-5 w-5' />
            Delete
          </div>
          <div
            className={mc(
              'absolute right-12 h-[1px] w-[1px] rounded-full bg-slate-800 transition-[scale] duration-250',
              isTriggered && 'scale-[100000%]'
            )}
          />
        </div>

        <div
          onMouseDown={(e) => setInitial(e.pageX)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={(e) => setInitial(e.changedTouches[0].clientX)}
          onTouchMove={(e) => handleMove(e.changedTouches[0].clientX)}
          onTouchEnd={handleTouchEnd}
          className={mc(
            'rounded-md bg-white',
            isTriggered && 'transition-transform duration-700',
            !delta && 'transition-transform duration-250'
          )}
          style={{
            transform: `translateX(${delta}px)`,
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)

export default SwipeX
