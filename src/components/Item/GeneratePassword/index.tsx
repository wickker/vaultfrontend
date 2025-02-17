import { ChangeEvent, MouseEvent, useState } from 'react'
import { GeneratePassword as generatePasswordLite } from 'generate-password-lite'
import { BsCopy } from 'react-icons/bs'
import { Button, Input, Menu, Switch } from '@/components/commons'
import { ButtonVariant } from '@/components/commons/Button/types'
import { useToastContext } from '@/contexts/useToastContext/context'
import { copyToClipboard } from '@/utils/functions/commons'

type Settings = {
  numbers: boolean
  symbols: boolean
  length: string
}

const defaultSettings: Settings = {
  numbers: true,
  symbols: true,
  length: '10',
} as const

const permanentSettings = {
  minLengthLowercase: 0,
  minLengthUppercase: 0,
  minLengthNumbers: 0,
}

type GeneratePasswordProps = {
  onAutofill: (v: string) => void
}

const GeneratePassword = ({ onAutofill }: GeneratePasswordProps) => {
  const { toast } = useToastContext()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [settings, setSettings] = useState<Settings>({ ...defaultSettings })
  const [passwordDisplay, setPasswordDisplay] = useState(
    generatePassword(defaultSettings) || ''
  )

  function generatePassword(config: Settings) {
    try {
      const length = parseInt(config.length)
      if (!length) {
        throw new Error('Invalid password characters input.')
      }
      const password = generatePasswordLite({
        numbers: config.numbers,
        symbols: config.symbols,
        length: length,
        ...permanentSettings,
      })
      return password
    } catch (e) {
      toast.error(`${e}`)
    }
  }

  const closeMenu = () => {
    setSettings(defaultSettings)
    setPasswordDisplay(generatePassword(defaultSettings) || '')
    setIsMenuVisible(false)
  }

  const openMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsMenuVisible(true)
  }

  const handleChangeLength = (e: ChangeEvent<HTMLInputElement>) =>
    setSettings((prev) => ({ ...prev, length: e.target.value }))

  const handleChangeNumbers = () =>
    setSettings((prev) => ({ ...prev, numbers: !prev.numbers }))

  const handleChangeSymbols = () =>
    setSettings((prev) => ({ ...prev, symbols: !prev.symbols }))

  const regeneratePassword = () => {
    const newPassword = generatePassword(settings)
    if (newPassword) {
      setPasswordDisplay(newPassword)
    }
  }

  const handleAutofill = (v: string) => {
    onAutofill(v)
    closeMenu()
  }

  return (
    <>
      <Menu
        isVisible={isMenuVisible}
        onClose={closeMenu}
        footer={
          <div className='flex items-center justify-between px-6 pt-3 pb-6'>
            <Button
              variant={ButtonVariant.OUTLINE}
              onClick={regeneratePassword}
            >
              Re-generate
            </Button>
            <Button onClick={() => handleAutofill(passwordDisplay)}>
              Autofill
            </Button>
          </div>
        }
      >
        <div className='mt-6 grid grid-cols-[1fr_auto] items-center gap-x-4'>
          <Input
            className='bg-app-background'
            value={passwordDisplay}
            onChange={(e) => setPasswordDisplay(e.target.value)}
          />
          <button
            className='hover:cursor-pointer'
            onClick={() => copyToClipboard(passwordDisplay, toast)}
          >
            <BsCopy className='h-6 w-6 text-slate-500' />
          </button>
        </div>

        <div className='my-6 h-[1px] w-full bg-slate-200' />

        <div className='flex h-[50px] items-center justify-between'>
          <p className='text-app-default font-semibold'>Characters</p>
          <Input
            className='bg-app-background w-[50px] p-1.5 text-sm'
            type='number'
            value={settings.length}
            onChange={handleChangeLength}
          />
        </div>

        <div className='flex h-[50px] items-center justify-between'>
          <p className='text-app-default font-semibold'>Numbers</p>
          <Switch checked={settings.numbers} onChange={handleChangeNumbers} />
        </div>

        <div className='flex h-[50px] items-center justify-between'>
          <p className='text-app-default font-semibold'>Symbols</p>
          <Switch checked={settings.symbols} onChange={handleChangeSymbols} />
        </div>
      </Menu>

      <Button className='mt-3 w-full' onClick={openMenu}>
        Generate
      </Button>
    </>
  )
}

export default GeneratePassword
