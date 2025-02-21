import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { RiLoader4Line } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router'
import Chips from './Chips'
import { ItemModalProps } from './ItemModal'
import ItemTile from './ItemTile'
import { Category } from '@/@types/categories'
import { AppLocation } from '@/@types/commons'
import { Item } from '@/@types/items'
import { Button, NoItemsYet, Page, SearchHeader } from '@/components/commons'
import useCategory from '@/hooks/queries/useCategory'
import useItem from '@/hooks/queries/useItem'
import {
  CategoryColor,
  GetItemsOrderBy,
  RelativeRoute,
} from '@/utils/constants/enums'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const Dashboard = () => {
  // state
  const [searchPhrase, setSearchPhrase] = useState<string>()
  const [orderBy, setOrderBy] = useState<GetItemsOrderBy>(
    GetItemsOrderBy.NAME_ASC
  )
  const [categoryId, setCategoryId] = useState(0) // TODO:

  // hooks
  const navigate = useNavigate()
  const location = useLocation()

  // query
  const request = {
    search_phrase: searchPhrase,
    order_by: orderBy,
    category_id: categoryId || undefined,
  }
  const queryKey = QUERY_KEYS.GET_ITEMS(request)
  const { useGetItemsQuery } = useItem()
  const getItems = useGetItemsQuery(request)
  const { useGetCategoriesQuery } = useCategory()
  const getCategories = useGetCategoriesQuery()
  const isLoading = getItems.isFetching || getCategories.isFetching
  const hasItems =
    getItems.isSuccess && getCategories.isSuccess && getItems.data.length > 0
  const categories: Array<Category> = [
    {
      id: 1,
      name: 'Default',
      color: CategoryColor.YELLOW,
    },
    ...(getCategories.data || []),
  ]
  const categoryInitialsMap = categories.reduce<Record<number, Category>>(
    (res, c) => {
      res[c.id] = {
        ...c,
        name: getInitials(c.name),
      }
      return res
    },
    {}
  )

  function getInitials(text: string) {
    const str = text.trim().split(' ')
    if (str.length === 0) return ''
    if (str.length === 1) {
      return str[0].charAt(0).toUpperCase()
    }
    return `${str[0].charAt(0)}${str[1].charAt(0)}`.toUpperCase()
  }

  const handleSearchChange = (s: string) => {
    const trimmed = s.trim()
    if (!trimmed) {
      setSearchPhrase(undefined)
      return
    }
    setSearchPhrase(trimmed)
  }

  const handleAddItem = () =>
    navigate(RelativeRoute.MODAL, {
      state: {
        props: {
          queryKey,
          dashboardCategoryId: categoryId === 0 ? 1 : categoryId,
          categories,
        },
        previousLocation: location,
      } satisfies AppLocation<ItemModalProps>,
    })

  const handleEditItem = (item: Item) =>
    navigate(RelativeRoute.MODAL, {
      state: {
        props: { item, queryKey, dashboardCategoryId: 0, categories },
        previousLocation: location,
      } satisfies AppLocation<ItemModalProps>,
    })

  const handleOrderByChange = (v: GetItemsOrderBy) => setOrderBy(v)

  const handleCategoryChange = (v: number) => setCategoryId(v)

  const renderItems = () => {
    if (isLoading)
      return (
        <div className='bg-app-background flex h-full w-full items-center justify-center'>
          <RiLoader4Line className='h-10 w-10 animate-spin text-slate-400' />
        </div>
      )

    if (!hasItems && searchPhrase)
      return (
        <div className='bg-app-background flex h-full w-full items-center justify-center'>
          <p className='text-slate-500'>
            No search results found for {searchPhrase}
          </p>
        </div>
      )

    if (!hasItems) return <NoItemsYet />

    return (
      <div className='bg-app-background scrollbar flex h-full w-full flex-col gap-y-3 overflow-y-auto px-6 pb-22'>
        {(getItems.data || []).map((item) => (
          <ItemTile
            key={item.id}
            item={item}
            onEdit={() => handleEditItem(item)}
            categoryInitials={categoryInitialsMap[item.category_id].name}
            categoryColor={categoryInitialsMap[item.category_id].color}
          />
        ))}
      </div>
    )
  }

  return (
    <Page
      header={
        <div className='bg-app-background pb-5'>
          <SearchHeader
            onSearchChange={handleSearchChange}
            isSearchDisabled={isLoading}
          />
          <Chips
            orderBy={orderBy}
            onOrderByChange={handleOrderByChange}
            isDisabled={isLoading}
            categoryId={categoryId}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />
        </div>
      }
      className='relative'
    >
      {renderItems()}

      <div className='absolute right-0 bottom-[52px] p-6'>
        <Button
          icon={<FaPlus className='h-5 w-5' />}
          className='rounded-full p-2'
          onClick={handleAddItem}
          disabled={isLoading}
        />
      </div>
    </Page>
  )
}

export default Dashboard
