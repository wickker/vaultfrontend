import { MouseEvent, PropsWithChildren, useState } from 'react'
import { Chip, FilterOptions, Menu } from '@/components/commons'
import { SelectOption } from '@/components/commons/Select'

type FilterChipProps<T = string> = {
  isDisabled?: boolean
  isActive?: boolean
  options: Array<SelectOption<T>>
  value: T
  onChange: (v: T) => void
} & PropsWithChildren

const FilterChip = <T,>({
  isDisabled = false,
  isActive = true,
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
        isActive={isActive}
        onClick={handleOpenSelect}
      >
        {children}
      </Chip>

      <Menu isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <FilterOptions
          options={options}
          value={value}
          onSelect={handleSelect}
        />
      </Menu>
    </>
  )
}

export default FilterChip
