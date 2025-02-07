import { FaRegUser } from 'react-icons/fa'
import { LuLayoutDashboard } from 'react-icons/lu'
import { useLocation, useNavigate } from 'react-router'
import { Route } from '@/utils/constants/enums'
import { mc } from '@/utils/functions/commons'

const routes = [
  {
    path: Route.DASHBOARD,
    icon: <LuLayoutDashboard className='h-5 w-5' />,
  },
  {
    path: Route.PROFILE,
    icon: <FaRegUser className='h-5 w-5' />,
  },
]

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-around p-4 text-neutral-300'>
      {routes.map((route) => {
        const isSelected = location.pathname === route.path

        return (
          <button
            className={mc(
              'hover:cursor-pointer',
              isSelected && 'text-app-default'
            )}
            onClick={() => navigate(route.path)}
          >
            {route.icon}
          </button>
        )
      })}
    </div>
  )
}

export default Footer
