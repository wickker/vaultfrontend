import { MouseEvent, useState } from 'react'

const swipeLimit = 120

const SwipeX = () => {
  const [initial, setInitial] = useState(0)
  const [delta, setDelta] = useState(0)
  const [prevX, setPrevX] = useState(0)

  const handleEnd = () => setPrevX(delta)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return
    handleMove(e.pageX)
  }

  const handleMove = (currentX: number) => {
    let delta = initial - currentX

    delta = delta * -1

    delta = delta + prevX

    if (delta < -swipeLimit) {
      delta = -swipeLimit
    }

    if (delta > 0) {
      delta = 0
    }

    setDelta(delta)
  }

  return (
    <div className='grid-stack min-h-[50px] w-full overflow-hidden bg-amber-200'>
      <div className='h-full w-full bg-purple-300' />
      <div
        onMouseDown={(e) => setInitial(e.pageX)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onTouchStart={(e) => setInitial(e.changedTouches[0].clientX)}
        onTouchMove={(e) => handleMove(e.changedTouches[0].clientX)}
        onTouchEnd={handleEnd}
        className='h-full w-full bg-pink-300'
        style={{
          transform: `translateX(${delta}px)`,
        }}
      />
    </div>
  )
}

export default SwipeX
