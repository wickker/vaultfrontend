import { PropsWithChildren } from 'react'

type FormItemProps = {
  label?: string
  error?: string
} & PropsWithChildren

const FormItem = ({ label = '', error = '', children }: FormItemProps) => {
  return (
    <div className='flex flex-col'>
      {label && (
        <label className='text-app-default mb-[6px] font-semibold'>
          {label}
        </label>
      )}

      {children}

      <p className='text-app-danger mt-[6px] h-[16px] text-xs'>{error}</p>
    </div>
  )
}

export default FormItem
