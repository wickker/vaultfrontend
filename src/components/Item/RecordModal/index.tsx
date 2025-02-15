import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router'
import { Record } from '@/@types/records'
import { Modal, Select } from '@/components/commons'
import ModalFooter from '@/components/commons/ModalFooter'
import { RecordType } from '@/utils/constants/enums'

export type RecordModalProps = {
  itemId: number
  record?: Record
}

const RecordModal = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState<RecordType>(RecordType.PASSWORD)

  const handleCancel = () => {
    // reset(defaultValues)
    navigate(-1)
  }

  return (
    <Modal
      isVisible
      footer={
        <ModalFooter
          onCancel={handleCancel}
          onSave={() => {}}
          // isSaveLoading
          // isSaveDisabled
        />
      }
      header={
        <div className='text-app-default flex items-center justify-between p-6'>
          <h1 className='text-3xl font-semibold'>Add Record</h1>
          <button className='hover:cursor-pointer' onClick={handleCancel}>
            <RxCross2 className='h-9 w-9' />
          </button>
        </div>
      }
    >
      <div className='flex flex-col p-6'>
        <form>
          <Select<RecordType>
            options={Object.values(RecordType).map((r) => ({
              text: r,
              value: r,
            }))}
            value={value}
            onChange={setValue}
          />
          {/* <FormItem label='Name' error={errors.name?.message}>
              <Input
                className='bg-app-background'
                {...rest}
                ref={(e) => {
                  ref(e)
                  firstInputRef.current = e
                }}
              />
            </FormItem> */}
        </form>
      </div>
    </Modal>
  )
}

export default RecordModal
