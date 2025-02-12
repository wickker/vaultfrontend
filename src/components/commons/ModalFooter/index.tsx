import { Button } from '@/components/commons'
import { ButtonVariant } from '@/components/commons/Button/types'

type ModalFooterProps = {
  onCancel: () => void
  onSave: () => void
  isSaveDisabled: boolean
  isSaveLoading: boolean
}

const ModalFooter = ({
  onCancel,
  onSave,
  isSaveDisabled = false,
  isSaveLoading = false,
}: ModalFooterProps) => {
  return (
    <div className='flex items-center justify-between p-6 shadow-[0_0_100px_0_rgba(226,232,240,0.7)]'>
      <Button variant={ButtonVariant.SECONDARY} onClick={onCancel}>
        Cancel
      </Button>

      <Button
        onClick={onSave}
        isLoading={isSaveLoading}
        disabled={isSaveDisabled}
      >
        Save
      </Button>
    </div>
  )
}

export default ModalFooter
