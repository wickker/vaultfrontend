import { useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router'
import { CategoryFormSchema } from '@/@types/categories'
import { FormItem, Input, Modal, ModalFooter } from '@/components/commons'
import useCategory from '@/hooks/queries/useCategory'
import { CategoryColor } from '@/utils/constants/enums'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'
import { mc } from '@/utils/functions/commons'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type CategoryModalProps = {}

const CategoryModal = () => {
  // form
  const defaultValues = { name: '', color: CategoryColor.YELLOW }
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
  const title = 'Add Category'
  const navigate = useNavigate()

  // query
  const queryClient = useQueryClient()
  const { useCreateCategoryMutation } = useCategory()
  const createCategory = useCreateCategoryMutation(createCategorySuccessCb)

  function createCategorySuccessCb() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_CATEGORIES })
    handleCancel()
  }

  const handleSave = handleSubmit((d) => {
    createCategory.mutate(d)
  })

  const handleCancel = () => {
    reset(defaultValues)
    navigate(-1)
  }

  return (
    <Modal
      isVisible
      footer={
        <ModalFooter
          onCancel={handleCancel}
          onSave={handleSave}
          isSaveLoading={createCategory.isPending}
        />
      }
      header={
        <div className='text-app-default flex items-center justify-between p-6'>
          <h1 className='text-3xl font-semibold'>{title}</h1>
          {!title ? (
            <button className='hover:cursor-pointer'>
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
  )
}

export default CategoryModal
