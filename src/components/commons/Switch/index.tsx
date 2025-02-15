type SwitchProps = {
  checked: boolean
  onChange: () => void
}

const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <>
      <input type='checkbox' className='peer sr-only' checked={checked} />
      <div
        className="peer bg-app-default peer-checked:bg-app-default relative h-6 w-11 rounded-full opacity-20 peer-checked:opacity-100 peer-focus:ring-2 peer-focus:ring-slate-300 peer-focus:ring-offset-2 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"
        onClick={onChange}
      />
    </>
  )
}

export default Switch
