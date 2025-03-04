import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Camera as CameraPro, CameraType } from 'react-camera-pro'
import { FacingMode } from 'react-camera-pro/dist/components/Camera/types'
import { FaPlus } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { PiUserSwitch } from 'react-icons/pi'
import { Button, Page } from '@/components/commons'
import { useToastContext } from '@/contexts/useToastContext/context'

const Camera = () => {
  const camera = useRef<CameraType>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string>()
  const [numberOfCameras, setNumberOfCameras] = useState(0)
  const [facingMode, setFacingMode] = useState<FacingMode>('environment')
  const { toast } = useToastContext()
  const [position, setPosition] = useState<GeolocationPosition>()

  const handleTakePhoto = () => {
    try {
      const photo = camera.current?.takePhoto()
      setImage(photo as string)
    } catch (e) {
      toast.error(e as string)
    }
  }

  const handleSwitchCamera = () => {
    try {
      const mode = camera.current?.switchCamera()
      if (mode) setFacingMode(mode)
    } catch (e) {
      toast.error(e as string)
    }
  }

  const handleSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    console.log(e.target.files)
  }

  useEffect(() => {
    let watchId = 0
    if (navigator.geolocation && !watchId) {
      watchId = navigator.geolocation.watchPosition((p) => setPosition(p))
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  return (
    <Page hideFooter>
      <div className='grid h-full grid-rows-[1fr_auto_1.5fr] overflow-hidden'>
        <div className='bg-app-background flex items-center justify-between px-6'>
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
          errorMessages={{}}
          aspectRatio={3 / 4}
          numberOfCamerasCallback={setNumberOfCameras}
          facingMode={facingMode}
        />

        <div className='bg-app-background grid grid-rows-[auto_1fr]'>
          <div className='text-app-default flex items-center gap-x-3 px-2 py-1 text-xs'>
            {position && (
              <>
                <FaLocationDot />
                <p>Latitude: {position?.coords.latitude}</p>
                <p>Longitude: {position?.coords.longitude}</p>
              </>
            )}
          </div>

          <div className='bg-app-background grid grid-cols-[1fr_auto_1fr]'>
            <div />
            <button
              className='h-14 w-14 self-center justify-self-center rounded-full border-6 border-white bg-slate-500 hover:cursor-pointer'
              onClick={handleTakePhoto}
            />
            {image && (
              <img
                className='mr-6 aspect-3/4 w-[60px] self-center justify-self-end bg-amber-300'
                src={image}
              />
            )}
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Camera
