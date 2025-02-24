import { UIEvent, useState } from 'react'

const useScrollToBottom = () => {
  const [isBottom, setIsBottom] = useState(false)

  const handleScrollToBottom = (e: UIEvent<HTMLDivElement>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
        e.currentTarget.clientHeight &&
      !isBottom
    ) {
      setIsBottom(true)
      return
    }
    if (isBottom) setIsBottom(false)
  }

  return { handleScrollToBottom, isBottom }
}

export default useScrollToBottom
