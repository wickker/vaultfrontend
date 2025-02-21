import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { Location, useLocation, useNavigate } from 'react-router'
import { Category } from '@/@types/categories'
import { AppLocation } from '@/@types/commons'
import { GetItemsRequest, Item, ItemFormSchema } from '@/@types/items'
import {
  FormItem,
  Input,
  Modal,
  ModalConfirmDelete,
  Select,
  ModalFooter,
} from '@/components/commons'
import CategoryTile from '@/components/Main/Dashboard/CategoryTile'
import useItem from '@/hooks/queries/useItem'

export type ItemModalProps = {
  queryKey: readonly ['items', GetItemsRequest]
  item?: Item
  dashboardCategoryId: number
  categories: Array<Category>
}

const ItemModal = () => {
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false)

  // props
  const location: Location<AppLocation<ItemModalProps>> = useLocation()
  const { item, queryKey, dashboardCategoryId, categories } =
    location.state.props

  // form
  const defaultValues = item
    ? { name: item.name, category_id: item.category_id }
    : { name: '', category_id: dashboardCategoryId }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(ItemFormSchema),
    values: defaultValues,
  })
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register('name')
  const navigate = useNavigate()
  const title = item ? 'Update Item' : 'Add Item'

  // query
  const queryClient = useQueryClient()
  const {
    useCreateItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
  } = useItem()
  const createItem = useCreateItemMutation(createItemSuccessCb)
  const updateItem = useUpdateItemMutation(updateItemSuccessCb)
  const deleteItem = useDeleteItemMutation(deleteItemSuccessCb)
  const categoryOptions = categories.map((c) => ({
    text: <CategoryTile name={c.name} color={c.color} />,
    value: c.id,
  }))

  function deleteItemSuccessCb() {
    queryClient.setQueryData(queryKey, (items: Array<Item>) =>
      items.filter((i) => i.id !== item?.id)
    )
    setIsDeleteConfirmationVisible(false)
    handleCancel()
  }

  function createItemSuccessCb() {
    queryClient.invalidateQueries({ queryKey })
    handleCancel()
  }

  function updateItemSuccessCb(d: Item) {
    queryClient.setQueryData(queryKey, (items: Array<Item>) =>
      items.map((i) =>
        i.id === d.id ? { ...i, name: d.name, category_id: d.category_id } : i
      )
    )
    handleCancel()
  }

  const handleSave = handleSubmit((d) => {
    if (!item) {
      createItem.mutate(d)
      return
    }
    updateItem.mutate({
      id: item.id,
      name: d.name,
      category_id: d.category_id,
    })
  })

  const handleCancel = () => {
    reset(defaultValues)
    navigate(-1)
  }

  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus()
  }, [])

  return (
    <>
      <Modal
        isVisible
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
              <button
                className='hover:cursor-pointer'
                onClick={() => setIsDeleteConfirmationVisible(true)}
              >
                <BsTrash className='text-app-danger h-7 w-7' />
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
              <Input
                className='bg-app-background'
                {...rest}
                ref={(e) => {
                  ref(e)
                  firstInputRef.current = e
                }}
              />
            </FormItem>

            <FormItem label='Category' error={errors.name?.message}>
              <Controller
                control={control}
                name='category_id'
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={categoryOptions}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormItem>
          </form>
        </div>
      </Modal>

      {item && (
        <ModalConfirmDelete
          isVisible={isDeleteConfirmationVisible}
          onConfirm={() => deleteItem.mutate(item.id)}
          onClose={() => setIsDeleteConfirmationVisible(false)}
          text='Do you really want to delete this item? All associated records will be deleted as well and this process cannot be undone.'
          isLoading={deleteItem.isPending}
        />
      )}
    </>
  )
}

export default ItemModal
