import { useEffect, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import { RiLoader4Line } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router'
import RecordTile from './RecordTile'
import { Button, NoItemsYet, Page } from '@/components/commons'
import useRecord from '@/hooks/queries/useRecord'
import { RecordType, Route } from '@/utils/constants/enums'

const Item = () => {
  const [recordIdsToHide, setRecordIdsToHide] = useState<Array<number>>([])
  const navigate = useNavigate()
  const { id } = useParams()
  const itemId = parseInt(atob(id || ''))
  const { useGetRecordsByItem } = useRecord()
  const getRecords = useGetRecordsByItem(itemId)
  const hasRecords = getRecords.isSuccess && getRecords.data.records.length > 0

  const handleGoBack = () => navigate(Route.DASHBOARD)

  const renderRecords = () => {
    if (getRecords.isFetching)
      return (
        <div className='bg-app-background flex h-full w-full items-center justify-center'>
          <RiLoader4Line className='h-10 w-10 animate-spin text-slate-400' />
        </div>
      )

    if (!hasRecords) return <NoItemsYet entityName='records' />

    return (
      <div className='bg-app-background scrollbar flex h-full w-full flex-col gap-y-3 overflow-y-auto px-6 pt-6 pb-22'>
        {getRecords.data.records.map((record) => {
          return (
            <RecordTile
              record={record}
              showValue={!recordIdsToHide.includes(record.id)}
              key={record.id}
            />
          )
        })}
      </div>
    )
  }

  useEffect(() => {
    if (hasRecords) {
      const idsToHide = getRecords.data.records
        .filter(
          (r) => r.name === RecordType.PASSWORD || r.name === RecordType.PIN
        )
        .map((r) => r.id)
      setRecordIdsToHide(idsToHide)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRecords.data?.records])

  return (
    <Page
      hideFooter
      header={
        <div className='bg-app-background flex items-center gap-x-6 p-6'>
          <Button
            icon={<IoChevronBack className='h-5 w-5' />}
            className='rounded-full p-2'
            variant='secondary'
            onClick={handleGoBack}
          />
          <h1 className='text-3xl font-semibold'>
            {getRecords.data?.name || ''}
          </h1>
        </div>
      }
    >
      {renderRecords()}
    </Page>
  )
}

export default Item
