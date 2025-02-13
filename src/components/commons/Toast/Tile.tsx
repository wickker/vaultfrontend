import { motion } from 'framer-motion'
import { FaInfoCircle } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { PiWarningCircleFill } from 'react-icons/pi'
import { RxCross2 } from 'react-icons/rx'
import { RxCrossCircled } from 'react-icons/rx'
import { Toast } from './types'
import { mc } from '@/utils/functions/commons'

type TileProps = {
  type: Toast
  message: string
  onClose: () => void
}

const Tile = ({ type = Toast.SUCCESS, message = '', onClose }: TileProps) => {
  const getIcon = () => {
    switch (type) {
      case Toast.ERROR:
        return <RxCrossCircled className='h-8 w-8 text-[#f2355c]' />
      case Toast.INFO:
        return <FaInfoCircle className='h-8 w-8 text-[#3086eb]' />
      case Toast.WARNING:
        return <PiWarningCircleFill className='h-8 w-8 text-[#f8c021]' />
      case Toast.SUCCESS:
      default:
        return <FaCircleCheck className='h-8 w-8 text-[#50d764]' />
    }
  }

  return (
    <motion.div
      className='grid h-fit w-full grid-cols-[auto_1fr] overflow-hidden rounded-md bg-white shadow-lg'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={mc(
          'w-[10px] bg-[#50d764]',
          type === Toast.ERROR && 'bg-[#f2355c]',
          type === Toast.INFO && 'bg-[#3086eb]',
          type === Toast.WARNING && 'bg-[#f8c021]'
        )}
      />

      <div className='flex flex-col px-4 py-3'>
        <div className='grid grid-cols-[auto_1fr] items-center gap-x-4'>
          {getIcon()}

          <div className='text-app-default'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl'>{type}</h1>
              <button onClick={onClose}>
                <RxCross2 className='h-7 w-7' />
              </button>
            </div>

            <p className='text-sm text-slate-500'>{message}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Tile
