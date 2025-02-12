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
  const { useCreateItemMutation, useUpdateItemMutation } = useItem()
  const createItem = useCreateItemMutation(createItemSuccessCb)
  const updateItem = useUpdateItemMutation(updateItemSuccessCb)
  const title = item ? 'Update Item' : 'Add Item'

  function createItemSuccessCb() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_ITEMS })
    handleCancel()
  }

  function updateItemSuccessCb(d: Item) {
    queryClient.setQueryData(QUERY_KEYS.GET_ITEMS, (items: Array<Item>) =>
      items.map((item) => (item.id === d.id ? { ...item, name: d.name } : item))
    )
    handleCancel()
  }

  const handleSave = handleSubmit((d) => {
    if (!item) {
      createItem.mutate(d.name)
      return
    }
    updateItem.mutate({
      id: item.id,
      name: d.name,
    })
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
          isSaveLoading={createItem.isPending || updateItem.isPending}
        />
      }
      header={
        <div className='text-app-default flex items-center justify-between p-6'>
          <h1 className='text-3xl font-semibold'>{title}</h1>
          {item ? (
            <button className='hover:cursor-pointer' onClick={() => {}}>
              {/* TODO: Add delete functionality */}
              <RxCross2 className='h-9 w-9' />
            </button>
          ) : (
            <button className='hover:cursor-pointer' onClick={handleCancel}>
              <RxCross2 className='h-9 w-9' />
            </button>
          )}
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
