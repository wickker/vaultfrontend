import { FaPlus } from 'react-icons/fa6'
import { FiEdit } from 'react-icons/fi'
import { IoChevronBack } from 'react-icons/io5'
import { RiLoader4Line } from 'react-icons/ri'
import { useNavigate } from 'react-router'
import { Button, Page } from '@/components/commons'
import { ButtonVariant } from '@/components/commons/Button/types'
import useCategory from '@/hooks/queries/useCategory'
import { CategoryColor, Route } from '@/utils/constants/enums'

const Categories = () => {
  const navigate = useNavigate()
  const { useGetCategoriesQuery } = useCategory()
  const getCategories = useGetCategoriesQuery()
  const categories = [
    { id: 1, name: 'Default', color: CategoryColor.YELLOW },
    ...(getCategories.data || []),
  ]

  const handleGoBack = () => navigate(Route.PROFILE)

  const renderCategories = () => {
    if (getCategories.isFetching)
      return (
        <div className='bg-app-background flex h-full w-full items-center justify-center'>
          <RiLoader4Line className='h-10 w-10 animate-spin text-slate-400' />
        </div>
      )

    return (
      <div className='bg-app-background scrollbar flex h-full w-full flex-col gap-y-3 overflow-y-auto px-6 pt-6 pb-22'>
        {categories.map((c) => (
          <div
            className='grid grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-md bg-white p-4'
            key={c.id}
          >
            <div
              className='h-5 w-5 rounded-full'
              style={{
                backgroundColor: c.color,
              }}
            />

            <p className='text-app-default truncate text-base font-semibold'>
              {c.name}
            </p>

            <button onClick={() => {}} className='hover:cursor-pointer'>
              <FiEdit className='h-6 w-6 text-slate-500' />
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Page
      hideFooter
      header={
        <div className='bg-app-background flex w-0 min-w-full items-center gap-x-6 p-6'>
          <Button
            icon={<IoChevronBack className='h-5 w-5' />}
            className='rounded-full p-2'
            variant={ButtonVariant.SECONDARY}
            onClick={handleGoBack}
          />
          <h1 className='truncate text-3xl font-semibold'>Categories</h1>
        </div>
      }
      className='relative'
    >
      {renderCategories()}

      <div className='absolute right-0 bottom-0 p-6'>
        <Button
          icon={<FaPlus className='h-5 w-5' />}
          className='rounded-full p-2'
          //   onClick={handleAddRecord}
          disabled={getCategories.isFetching}
        />
      </div>
    </Page>
  )
}

export default Categories
