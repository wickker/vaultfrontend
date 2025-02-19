import { Fragment } from 'react'
import { FaCheck } from 'react-icons/fa'
import { SelectOption } from '@/components/commons/Select'
import { mc } from '@/utils/functions/commons'

type FilterOptionsProps<T = string> = {
  options: Array<SelectOption<T>>
  value: T
  onSelect: (v: T) => void
}

const FilterOptions = <T,>({
  options,
  value,
  onSelect,
}: FilterOptionsProps<T>) =>
  options.map((o) => {
    const isSelected = o.value === value

    return (
      <Fragment key={`${o.value}`}>
        <button
          className='grid w-full grid-cols-[1fr_auto] items-center gap-x-2 py-3'
          onClick={() => onSelect(o.value)}
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
  })

export default FilterOptions
