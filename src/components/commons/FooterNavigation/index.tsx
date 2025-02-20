import { BiHomeAlt } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router'
import { Route } from '@/utils/constants/enums'
import { mc } from '@/utils/functions/commons'

const routes = [
  {
    path: Route.DASHBOARD,
    icon: <BiHomeAlt className='h-6 w-6' />,
  },
  {
    path: Route.PROFILE,
    icon: <FaRegUser className='h-5 w-5' />,
  },
]

const FooterNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className='flex h-[52px] items-center justify-around p-4 text-slate-400'>
      {routes.map((route) => {
        const isSelected = location.pathname === route.path

        return (
          <button
            className={mc(
              'hover:cursor-pointer',
              isSelected && 'text-app-default'
            )}
            onClick={() => navigate(route.path)}
            key={route.path}
          >
            {route.icon}
          </button>
        )
      })}
    </div>
  )
}

export default FooterNavigation
