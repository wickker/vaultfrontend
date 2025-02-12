import { useEffect } from 'react'

const useDebounce = (
  currentValue: string,
  handleDebouncedValue: (v: string) => void,
  delay: number = 1000
) => {
  useEffect(() => {
    const timeoutId = setTimeout(
      () => handleDebouncedValue(currentValue),
      delay
    )

    return () => {
      clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue, delay])
}

export default useDebounce
