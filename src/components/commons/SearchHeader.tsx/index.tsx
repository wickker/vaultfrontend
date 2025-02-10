import { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { TbSearch } from 'react-icons/tb'
import { Input } from '@/components/commons'

const SearchHeader = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleSearchVisible = () => {
    if (isSearchVisible) {
      setIsSearchVisible(false)
      setSearchValue('')
      return
    }
    setIsSearchVisible(true)
  }

  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchVisible])

  return (
    <div className='text-app-default bg-app-background flex items-center justify-between gap-x-3 p-6'>
      {isSearchVisible ? (
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          ref={inputRef}
        />
      ) : (
        <h1 className='text-3xl'>Vault</h1>
      )}

      <button className='hover:cursor-pointer' onClick={toggleSearchVisible}>
        {isSearchVisible ? (
          <RxCross2 className='h-10 w-10' />
        ) : (
          <TbSearch className='h-8 w-8' />
        )}
      </button>
    </div>
  )
}

export default SearchHeader
