import { MouseEvent, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { FilterOptions, Menu } from '@/components/commons'

export type SelectOption<T = string> = {
  text: string
  value: T
}

type SelectProps<T = string> = {
  options: Array<SelectOption<T>>
  value: T
  onChange: (v: T) => void
}

const Select = <T,>({ options = [], value, onChange }: SelectProps<T>) => {
  const [isVisible, setIsVisible] = useState(false)

  const getLabel = () => {
    const selectedOption = options.find((o) => o.value === value)
    if (!selectedOption)
      return <span className='text-slate-500'>Select an option</span>
    return selectedOption.text
  }

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
      <Menu isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <FilterOptions
          options={options}
          value={value}
          onSelect={handleSelect}
        />
      </Menu>

      <button
        className='text-app-default focus-visible-app bg-app-background grid w-full grid-cols-[1fr_auto] items-center gap-x-2 rounded-md p-2.5 text-left text-base hover:cursor-pointer'
        onClick={handleOpenSelect}
      >
        <p className='truncate'>{getLabel()}</p>
        <FaChevronDown className='h-4 w-4 text-slate-500' />
      </button>
    </>
  )
}

export default Select
