import { Fragment, MouseEvent, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa6'
import { Menu } from '@/components/commons'
import { mc } from '@/utils/functions/commons'

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
        {options.map((o) => {
          const isSelected = o.value === value

          return (
            <Fragment key={`${o.value}`}>
              <button
                className='grid w-full grid-cols-[1fr_auto] items-center gap-x-2 py-3'
                onClick={() => handleSelect(o.value)}
              >
                <p
                  className={mc(
                    'text-app-default truncate text-left',
                    isSelected && 'font-semibold'
                  )}
                >
                  {o.text}
                </p>
                {isSelected && <FaCheck className='h-5 w-5 text-[#50d764]' />}
              </button>
              <div className='h-[1px] w-full bg-slate-200' />
            </Fragment>
          )
        })}
      </Menu>

      <button
        className='text-app-default focus-visible-app bg-app-background grid w-full grid-cols-[1fr_auto] items-center gap-x-2 rounded-md p-2.5 text-left text-base hover:cursor-pointer'
        onClick={handleOpenSelect}
      >
        <p className='truncate'>{`${value}`}</p>
        <FaChevronDown className='h-4 w-4 text-slate-500' />
      </button>
    </>
  )
}

export default Select
