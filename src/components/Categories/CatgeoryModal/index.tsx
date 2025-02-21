import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { Location, useLocation, useNavigate } from 'react-router'
import { Category, CategoryFormSchema } from '@/@types/categories'
import { AppLocation } from '@/@types/commons'
import {
  FormItem,
  Input,
  Modal,
  ModalConfirmDelete,
  ModalFooter,
} from '@/components/commons'
import useCategory from '@/hooks/queries/useCategory'
import { CategoryColor } from '@/utils/constants/enums'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'
import { mc } from '@/utils/functions/commons'

export type CategoryModalProps = {
  category?: Category
}

const CategoryModal = () => {
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false)

  // props
  const location: Location<AppLocation<CategoryModalProps>> = useLocation()
  const { category } = location.state.props

  // form
  const navigate = useNavigate()
  const defaultValues = category
    ? { name: category.name, color: category.color }
    : { name: '', color: CategoryColor.YELLOW }
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CategoryFormSchema),
    values: defaultValues,
  })
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register('name')
  const title = category ? 'Update Category' : 'Add Category'

  // query
  const queryClient = useQueryClient()
  const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
  } = useCategory()
  const createCategory = useCreateCategoryMutation(createCategorySuccessCb)
  const updateCategory = useUpdateCategoryMutation(updateCategorySuccessCb)
  const deleteCategory = useDeleteCategoryMutation(deleteCategorySuccessCb)

  function createCategorySuccessCb() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_CATEGORIES })
    handleCancel()
  }

  function updateCategorySuccessCb(res: Category) {
    queryClient.setQueryData(
      QUERY_KEYS.GET_CATEGORIES,
      (data: Array<Category>) =>
        data.map((c) =>
          c.id === res.id
            ? {
                id: c.id,
                name: res.name,
                color: res.color,
              }
            : c
        )
    )
    handleCancel()
  }

  function deleteCategorySuccessCb() {
    queryClient.setQueryData(
      QUERY_KEYS.GET_CATEGORIES,
      (data: Array<Category>) => data.filter((c) => c.id !== category?.id)
    )
    setIsDeleteConfirmationVisible(false)
    handleCancel()
  }

  const handleSave = handleSubmit((d) => {
    if (!category) {
      createCategory.mutate(d)
      return
    }
    updateCategory.mutate({ id: category.id, name: d.name, color: d.color })
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
            isSaveLoading={createCategory.isPending || updateCategory.isPending}
          />
        }
        header={
          <div className='text-app-default flex items-center justify-between p-6'>
            <h1 className='text-3xl font-semibold'>{title}</h1>
            {category ? (
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

          <FormItem label='Color' error={errors.color?.message}>
            <Controller
              control={control}
              name='color'
              render={({ field: { onChange, value } }) => (
                <div className='mt-3 grid grid-cols-4 place-items-center items-center gap-x-2 gap-y-5'>
                  {Object.values(CategoryColor).map((color) => {
                    const isSelected = color === value

                    return (
                      <button
                        className={mc(
                          'h-14 w-14 rounded-full hover:cursor-pointer',
                          isSelected && 'ring-2 ring-slate-300 ring-offset-2'
                        )}
                        key={color}
                        style={{
                          backgroundColor: color,
                        }}
                        onClick={() => onChange(color)}
                      />
                    )
                  })}
                </div>
              )}
            />
          </FormItem>
        </div>
      </Modal>

      {category && (
        <ModalConfirmDelete
          isVisible={isDeleteConfirmationVisible}
          onConfirm={() => deleteCategory.mutate(category.id)}
          onClose={() => setIsDeleteConfirmationVisible(false)}
          text='Do you really want to delete this category? This process cannot be undone. Category may only be deleted if there are no items associated with it.'
          isLoading={deleteCategory.isPending}
        />
      )}
    </>
  )
}

export default CategoryModal
