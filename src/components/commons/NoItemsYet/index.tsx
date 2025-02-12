import { BiSolidFolderOpen } from 'react-icons/bi'

type NoItemsYetProps = {
  entityName?: string
}

const NoItemsYet = ({ entityName = 'items' }: NoItemsYetProps) => {
  return (
    <div className='bg-app-background flex flex-col items-center justify-center'>
      <BiSolidFolderOpen className='h-20 w-20 text-slate-400' />
      <p className='mt-2 text-sm text-slate-400'>No {entityName} yet!</p>
    </div>
  )
}

export default NoItemsYet
