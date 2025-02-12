import { RxCross2 } from 'react-icons/rx'
import { FormItem, Input, Modal } from '@/components/commons'
import ModalFooter from '@/components/commons/ModalFooter'

type ItemModalProps = {
  isVisible: boolean
  onClose: () => void
}

const ItemModal = ({ isVisible, onClose }: ItemModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      footer={<ModalFooter onCancel={onClose} onSave={() => {}} />}
      header={
        <div className='text-app-default flex items-center justify-between p-6'>
          <h1 className='text-3xl font-semibold'>Add Item</h1>
          <button className='hover:cursor-pointer' onClick={onClose}>
            <RxCross2 className='h-9 w-9' />
          </button>
        </div>
      }
    >
      <div className='flex flex-col p-6'>
        <FormItem label='Name'>
          <Input className='bg-app-background' />
        </FormItem>
      </div>
    </Modal>
  )
}

export default ItemModal
