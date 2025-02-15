import { MouseEvent, useState } from 'react'
import { GeneratePassword as generatePw } from 'generate-password-lite'
import { BsCopy } from 'react-icons/bs'
import { Button, Input, Menu, Switch } from '@/components/commons'
import { ButtonVariant } from '@/components/commons/Button/types'

const GeneratePassword = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isNumbers, setIsNumbers] = useState(true)
  const [isSymbols, setIsSymbols] = useState(true)
  const [length, setLength] = useState('10')
  const [password, setPassword] = useState(generatePassword())

  function generatePassword() {
    try {
      const pw = generatePw({
        length: parseInt(length),
        symbols: isSymbols,
        numbers: isNumbers,
        minLengthLowercase: 0,
        minLengthUppercase: 0,
        minLengthNumbers: 0,
      })
      return pw
    } catch (e) {
      // TODO:
      console.log(e)
    }
  }

  const handleCloseMenu = () => {
    // TODO: Reset
    setIsVisible(false)
  }

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsVisible(true)
  }

  return (
    <>
      <Menu
        isVisible={isVisible}
        onClose={handleCloseMenu}
        footer={
          <div className='flex items-center justify-between px-6 pt-3 pb-6'>
            <Button
              variant={ButtonVariant.OUTLINE}
              onClick={() => setPassword(generatePassword())}
            >
              Re-generate
            </Button>
            <Button>Autofill</Button>
          </div>
        }
      >
        <div className='mt-6 grid grid-cols-[1fr_auto] items-center gap-x-4'>
          <Input
            className='bg-app-background'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <BsCopy className='h-6 w-6 text-slate-500' />
        </div>

        <div className='my-6 h-[1px] w-full bg-slate-200' />

        <div className='flex h-[50px] items-center justify-between'>
          <p className='text-app-default font-semibold'>Characters</p>
          <Input
            className='bg-app-background w-[50px] p-1.5 text-sm'
            type='number'
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className='flex h-[50px] items-center justify-between'>
          <p className='text-app-default font-semibold'>Numbers</p>
          <Switch
            checked={isNumbers}
            onChange={() => setIsNumbers((prev) => !prev)}
          />
        </div>

        <div className='flex h-[50px] items-center justify-between'>
          <p className='text-app-default font-semibold'>Symbols</p>
          <Switch
            checked={isSymbols}
            onChange={() => setIsSymbols((prev) => !prev)}
          />
        </div>
      </Menu>

      <Button className='mt-3 w-full' onClick={handleOpenMenu}>
        Generate
      </Button>
    </>
  )
}

export default GeneratePassword
