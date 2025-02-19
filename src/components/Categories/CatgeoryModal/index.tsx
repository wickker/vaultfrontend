import { BsTrash } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { Modal, ModalFooter } from '@/components/commons'

const CategoryModal = () => {
  const title = 'Add Category'

  return (
    <Modal
      isVisible
      footer={<ModalFooter onCancel={() => {}} onSave={() => {}} />}
      header={
        <div className='text-app-default flex items-center justify-between p-6'>
          <h1 className='text-3xl font-semibold'>{title}</h1>
          {!title ? (
            <button
              className='hover:cursor-pointer'
              //   onClick={() => setIsDeleteConfirmationVisible(true)}
            >
              <BsTrash className='text-app-danger h-7 w-7' />
            </button>
          ) : (
            <button className='hover:cursor-pointer' onClick={() => {}}>
              <RxCross2 className='h-9 w-9' />
            </button>
          )}
        </div>
      }
    >
      <div className='flex flex-col p-6'>Modal</div>
    </Modal>
  )
}

export default CategoryModal
