import { MouseEvent, PropsWithChildren, useState } from 'react'
import { OptionItem } from '@/@types/commons'
import { Chip, Options, Menu } from '@/components/commons'

type FilterChipProps<T = string> = {
  isDisabled?: boolean
  isPrimary?: boolean
  options: Array<OptionItem<T>>
  value: T
  onChange: (v: T) => void
} & PropsWithChildren

const FilterChip = <T,>({
  isDisabled = false,
  isPrimary = false,
  options = [],
  value,
  onChange,
  children,
}: FilterChipProps<T>) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleOpenSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsVisible(true)
  }

  const handleSelect = (v: T) => {
    onChange(v)
    setIsVisible(false)
  }

  return (
    <>
      <Chip
        disabled={isDisabled}
        isPrimary={isPrimary}
        onClick={handleOpenSelect}
      >
        {children}
      </Chip>

      <Menu isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <Options options={options} value={value} onSelect={handleSelect} />
      </Menu>
    </>
  )
}

export default FilterChip
