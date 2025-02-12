import { Modal } from '@/components/commons'

type ItemModalProps = {
  isVisible: boolean
}

const ItemModal = ({ isVisible }: ItemModalProps) => {
  return (
    <Modal isVisible={isVisible}>
      <div />
    </Modal>
  )
}

export default ItemModal
