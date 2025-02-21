import { Fragment } from 'react'
import { FaCheck } from 'react-icons/fa'
import { OptionItem } from '@/@types/commons'
import { mc } from '@/utils/functions/commons'

type OptionsProps<T = string> = {
  options: Array<OptionItem<T>>
  value: T
  onSelect: (v: T) => void
}

const Options = <T,>({ options, value, onSelect }: OptionsProps<T>) =>
  options.map((o) => {
    const isSelected = o.value === value

    return (
      <Fragment key={`${o.value}`}>
        <button
          className='grid w-full grid-cols-[1fr_auto] items-center gap-x-2 py-3'
          onClick={() => onSelect(o.value)}
        >
          <div
            className={mc(
              'text-app-default truncate text-left',
              isSelected && 'font-semibold'
            )}
          >
            {o.text}
          </div>
          {isSelected && (
            <FaCheck className='h-5 w-5 font-normal text-[#50d764]' />
          )}
        </button>
        <div className='h-[1px] w-full bg-slate-200' />
      </Fragment>
    )
  })

export default Options
