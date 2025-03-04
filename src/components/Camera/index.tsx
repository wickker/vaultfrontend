import { ChangeEvent, useRef, useState } from 'react'
import { Camera as CameraPro, CameraType } from 'react-camera-pro'
import { FaPlus } from 'react-icons/fa'
import { PiUserSwitch } from 'react-icons/pi'
import { Button, Page } from '@/components/commons'

const Camera = () => {
  const camera = useRef<CameraType>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string>()
  const [numberOfCameras, setNumberOfCameras] = useState(0)

  const handleTakePhoto = () => {
    const photo = camera.current?.takePhoto()
    setImage(photo as string)
  }

  const handleSwitchCamera = () => camera.current?.switchCamera()

  const handleSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    console.log(e.target.files)
  }

  return (
    <Page hideFooter>
      <div className='grid h-full grid-rows-[auto_1fr_auto] overflow-hidden'>
        <div className='bg-app-background flex h-[100px] items-center justify-between px-6'>
          <Button
            className='rounded-full p-2'
            onClick={() => inputRef.current?.click()}
          >
            <FaPlus className='h-5 w-5' />
          </Button>
          <input
            ref={inputRef}
            accept='image/*'
            type='file'
            onChange={handleSelectFiles}
            hidden
          />

          <Button
            className='h-10 w-10 rounded-full p-2'
            onClick={handleSwitchCamera}
            hidden={numberOfCameras <= 1}
          >
            <PiUserSwitch className='h-6 w-6' />
          </Button>
        </div>

        <CameraPro
          ref={camera}
          errorMessages={{}} // TODO: Check what this does
          aspectRatio={3 / 4}
          numberOfCamerasCallback={setNumberOfCameras}
        />

        <div className='bg-app-background grid h-[140px] grid-cols-[1fr_auto_1fr]'>
          <div />
          <button
            className='h-14 w-14 self-center justify-self-center rounded-full border-6 border-white bg-slate-500 hover:cursor-pointer'
            onClick={handleTakePhoto}
          />
          {image && (
            <img
              className='mr-6 h-[80px] w-[60px] self-center justify-self-end bg-amber-300'
              src={image}
            />
          )}
        </div>
      </div>
    </Page>
  )
}

export default Camera
