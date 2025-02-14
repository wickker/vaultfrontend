import { BsCopy } from 'react-icons/bs'
import { IoEyeOutline } from 'react-icons/io5'
import { Record } from '@/@types/records'

type RecordTileProps = {
  record: Record
  showValue?: boolean
  onToggleValueDisplay: (id: number) => void
}

const RecordTile = ({
  record,
  showValue = true,
  onToggleValueDisplay,
}: RecordTileProps) => {
  const renderValue = () => {
    if (showValue) return record.value

    return record.value
      .split('')
      .map(() => '*')
      .join('')
  }

  return (
    <div className='flex flex-col gap-y-3 rounded-md bg-white p-4'>
      <div className='grid grid-cols-[1fr_auto]'>
        <p className='font-semibold'>{record.name}</p>

        <div className='flex items-center gap-x-3'>
          <button onClick={() => onToggleValueDisplay(record.id)}>
            <IoEyeOutline className='h-6 w-6' />
          </button>
          <BsCopy className='h-5 w-5' />
        </div>
      </div>

      <div className='text-app-default focus-visible-app bg-app-background block w-full rounded-md p-2.5 text-sm'>
        {renderValue()}
      </div>
    </div>
  )
}

export default RecordTile
