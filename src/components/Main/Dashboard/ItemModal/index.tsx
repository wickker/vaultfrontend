import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import { Item, ItemFormSchema } from '@/@types/items'
import { FormItem, Input, Modal } from '@/components/commons'
import ModalFooter from '@/components/commons/ModalFooter'
import useItem from '@/hooks/queries/useItem'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

type ItemModalProps = {
  isVisible: boolean
  onClose: () => void
  item?: Item
}

const ItemModal = ({ isVisible, onClose, item }: ItemModalProps) => {
  const defaultValues = {
    name: item ? item.name : '',
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ItemFormSchema),
    values: defaultValues,
  })
  const queryClient = useQueryClient()
  const { useCreateItemMutation } = useItem()
  const createItem = useCreateItemMutation(createItemSuccessCb)

  function createItemSuccessCb() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_ITEMS })
    handleCancel()
  }

  const handleSave = handleSubmit((d) => {
    createItem.mutate(d.name)
  })

  const handleCancel = () => {
    reset(defaultValues)
    onClose()
  }

  return (
    <Modal
      isVisible={isVisible}
      footer={
        <ModalFooter
          onCancel={handleCancel}
          onSave={handleSave}
          isSaveLoading={createItem.isPending}
        />
      }
      header={
        <div className='text-app-default flex items-center justify-between p-6'>
          <h1 className='text-3xl font-semibold'>Add Item</h1>
          <button className='hover:cursor-pointer' onClick={handleCancel}>
            <RxCross2 className='h-9 w-9' />
          </button>
        </div>
      }
    >
      <div className='flex flex-col p-6'>
        <form>
          <FormItem label='Name' error={errors.name?.message}>
            <Input className='bg-app-background' {...register('name')} />
          </FormItem>
        </form>
      </div>
    </Modal>
  )
}

export default ItemModal
