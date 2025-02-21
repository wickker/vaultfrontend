import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { Location, useLocation, useNavigate } from 'react-router'
import { AppLocation } from '@/@types/commons'
import {
  GetRecordsByItemResponse,
  Record,
  RecordFormSchema,
} from '@/@types/records'
import {
  FormItem,
  Input,
  Modal,
  ModalConfirmDelete,
  Select,
  ModalFooter,
} from '@/components/commons'
import GeneratePassword from '@/components/Item/GeneratePassword'
import useRecord from '@/hooks/queries/useRecord'
import { RecordType } from '@/utils/constants/enums'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

export type RecordModalProps = {
  itemId: number
  record?: Record
}

const RecordModal = () => {
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false)

  // props
  const location: Location<AppLocation<RecordModalProps>> = useLocation()
  const { itemId, record } = location.state.props

  // form
  const navigate = useNavigate()
  const defaultValues = record
    ? { name: record.name as RecordType, value: record.value }
    : {
        name: RecordType.PASSWORD,
        value: '',
      }
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(RecordFormSchema),
    values: defaultValues,
  })
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register('value')
  const name = watch('name')
  const title = record ? 'Update Record' : 'Add Record'

  // query
  const queryClient = useQueryClient()
  const {
    useCreateRecordMutation,
    useUpdateRecordMutation,
    useDeleteRecordMutation,
  } = useRecord()
  const createRecord = useCreateRecordMutation(createRecordSuccessCb)
  const updateRecord = useUpdateRecordMutation(updateRecordSuccessCb)
  const deleteRecord = useDeleteRecordMutation(deleteRecordSuccessCB)

  function deleteRecordSuccessCB() {
    queryClient.setQueryData(
      QUERY_KEYS.GET_RECORDS(itemId),
      (data: GetRecordsByItemResponse) => {
        const updatedRecords = data.records.filter((r) => r.id !== record?.id)
        return {
          ...data,
          records: updatedRecords,
        }
      }
    )
    setIsDeleteConfirmationVisible(false)
    handleCancel()
  }

  function createRecordSuccessCb() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_RECORDS(itemId) })
    handleCancel()
  }

  function updateRecordSuccessCb(res: Record) {
    queryClient.setQueryData(
      QUERY_KEYS.GET_RECORDS(itemId),
      (data: GetRecordsByItemResponse) => {
        const updatedRecords = data.records.map((r) =>
          r.id === res.id
            ? {
                id: r.id,
                name: res.name,
                value: res.value,
              }
            : r
        )
        return {
          ...data,
          records: updatedRecords,
        }
      }
    )
    handleCancel()
  }

  const handleSave = handleSubmit((d) => {
    if (!record) {
      createRecord.mutate({ name: d.name, value: d.value, item_id: itemId })
      return
    }
    updateRecord.mutate({ id: record.id, name: d.name, value: d.value })
  })

  const handleCancel = () => {
    reset(defaultValues)
    navigate(-1)
  }

  const handleAutofill = (v: string) => setValue('value', v)

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
            isSaveLoading={createRecord.isPending || updateRecord.isPending}
          />
        }
        header={
          <div className='text-app-default flex items-center justify-between p-6'>
            <h1 className='text-3xl font-semibold'>{title}</h1>
            {record ? (
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

            {name === RecordType.PASSWORD && (
              <GeneratePassword onAutofill={handleAutofill} />
            )}
          </form>
        </div>
      </Modal>

      {record && (
        <ModalConfirmDelete
          isVisible={isDeleteConfirmationVisible}
          onConfirm={() => deleteRecord.mutate(record.id)}
          onClose={() => setIsDeleteConfirmationVisible(false)}
          text='Do you really want to delete this record? This process cannot be undone.'
          isLoading={deleteRecord.isPending}
        />
      )}
    </>
  )
}

export default RecordModal
