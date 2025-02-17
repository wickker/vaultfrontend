import { MouseEvent } from 'react'
import { BsCopy } from 'react-icons/bs'
import { IoEyeOutline } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router'
import { AppLocation } from '@/@types/commons'
import { Record } from '@/@types/records'
import { RecordModalProps } from '@/components/Item/RecordModal'
import { RecordType, RelativeRoute } from '@/utils/constants/enums'

type RecordTileProps = {
  itemId: number
  record: Record
  showValue: boolean
  onToggleValueDisplay: (id: number) => void
  onCopy: (text: string) => void
}

const RecordTile = ({
  record,
  showValue = true,
  onToggleValueDisplay,
  onCopy,
  itemId,
}: RecordTileProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const showVisibilityToggle =
    record.name === RecordType.PASSWORD || record.name === RecordType.PIN

  const renderValue = () => {
    if (showValue) return record.value

    return record.value
      .split('')
      .map(() => '*')
      .join('')
  }

  const handleToggleValueDisplay = (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation()
    onToggleValueDisplay(id)
  }

  const handleCopyValue = (e: MouseEvent<HTMLButtonElement>, text: string) => {
    e.stopPropagation()
    onCopy(text)
  }

  const handleClickTile = () =>
    navigate(RelativeRoute.MODAL, {
      state: {
        props: { record, itemId },
        previousLocation: location,
      } satisfies AppLocation<RecordModalProps>,
    })

  return (
    <div
      className='flex flex-col gap-y-3 rounded-md bg-white p-4 hover:cursor-pointer'
      onClick={handleClickTile}
    >
      <div className='grid grid-cols-[1fr_auto]'>
        <p className='font-semibold'>{record.name}</p>

        <div className='flex items-center gap-x-3'>
          {showVisibilityToggle && (
            <button
              onClick={(e) => handleToggleValueDisplay(e, record.id)}
              className='hover:cursor-pointer'
            >
              <IoEyeOutline className='h-7 w-7' />
            </button>
          )}
          <button
            onClick={(e) => handleCopyValue(e, record.value)}
            className='hover:cursor-pointer'
          >
            <BsCopy className='h-5.5 w-5.5' />
          </button>
        </div>
      </div>

      <div className='text-app-default focus-visible-app bg-app-background block w-full rounded-md p-2.5 text-sm'>
        {renderValue()}
      </div>
    </div>
  )
}

export default RecordTile
