import { MouseEvent, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { OptionItem } from '@/@types/commons'
import { Options, Menu } from '@/components/commons'

type SelectProps<T = string> = {
  options: Array<OptionItem<T>>
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
        <Options options={options} value={value} onSelect={handleSelect} />
      </Menu>

      <button
        className='text-app-default focus-visible-app bg-app-background grid w-full grid-cols-[1fr_auto] items-center gap-x-2 rounded-md p-2.5 text-left text-base hover:cursor-pointer'
        onClick={handleOpenSelect}
      >
        <div className='truncate'>{getLabel()}</div>
        <FaChevronDown className='h-4 w-4 text-slate-500' />
      </button>
    </>
  )
}

export default Select
