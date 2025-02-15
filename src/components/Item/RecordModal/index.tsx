import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router'
import { Record } from '@/@types/records'
import { Modal } from '@/components/commons'
import ModalFooter from '@/components/commons/ModalFooter'

export type RecordModalProps = {
  itemId: number
  record?: Record
}

const RecordModal = () => {
  const navigate = useNavigate()

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
