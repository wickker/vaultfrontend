import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { RxCross2 } from 'react-icons/rx'
import { TbSearch } from 'react-icons/tb'
import { Input } from '@/components/commons'
import useDebounce from '@/hooks/useDebounce'

type SearchHeaderProps = {
  onSearchChange: (s: string) => void
}

const SearchHeader = ({ onSearchChange = () => {} }: SearchHeaderProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useDebounce(searchValue, onSearchChange)

  const showSearch = () => setIsSearchVisible(true)

  const hideSearch = () => {
    setIsSearchVisible(false)
    setSearchValue('')
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value)

  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchVisible])

  return (
    <AnimatePresence>
      {isSearchVisible ? (
        <motion.div
          className='text-app-default bg-app-background flex items-center justify-between gap-x-3 p-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Input value={searchValue} onChange={handleSearch} ref={inputRef} />

          <button className='hover:cursor-pointer' onClick={hideSearch}>
            <RxCross2 className='h-10 w-10' />
          </button>
        </motion.div>
      ) : (
        <motion.div
          className='text-app-default bg-app-background flex items-center justify-between gap-x-3 p-6'
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className='text-3xl'>Vault</h1>

          <button className='hover:cursor-pointer' onClick={showSearch}>
            <TbSearch className='h-8 w-8' />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchHeader
