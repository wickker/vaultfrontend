import { useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import { Location, useLocation, useNavigate } from 'react-router'
import { AppLocation } from '@/@types/commons'
import { Record, RecordFormSchema } from '@/@types/records'
import { FormItem, Input, Modal, Select } from '@/components/commons'
import ModalFooter from '@/components/commons/ModalFooter'
import { RecordType } from '@/utils/constants/enums'

export type RecordModalProps = {
  itemId: number
  record?: Record
}

const RecordModal = () => {
  const location: Location<AppLocation<RecordModalProps>> = useLocation()
  const itemId = location.state.props.itemId
  console.log(itemId)
  const navigate = useNavigate()
  const defaultValues = {
    name: RecordType.PASSWORD,
    value: '',
  }
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(RecordFormSchema),
    values: defaultValues,
  })
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register('value')

  const handleSave = handleSubmit((d) => {
    console.log(d)
  })

  const handleCancel = () => {
    reset(defaultValues)
    navigate(-1)
  }

  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus()
  }, [])

  return (
    <Modal
      isVisible
      footer={
        <ModalFooter
          onCancel={handleCancel}
          onSave={handleSave}
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
          <FormItem label='Type' error={errors.name?.message}>
            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value } }) => (
                <Select<RecordType>
                  options={Object.values(RecordType).map((r) => ({
                    text: r,
                    value: r,
                  }))}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>

          <FormItem label='Value' error={errors.value?.message}>
            <Input
              className='bg-app-background'
              {...rest}
              ref={(e) => {
                ref(e)
                firstInputRef.current = e
              }}
            />
          </FormItem>
        </form>
      </div>
    </Modal>
  )
}

export default RecordModal
