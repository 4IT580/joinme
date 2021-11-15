import { Link, useLocation } from 'react-router-dom'
import { InboxIcon, HomeIcon, CalendarIcon, UserGroupIcon, UserIcon, LogoutIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useAuth } from '../utils/auth'

export default function Sidebar() {
  const location = useLocation()
  const auth = useAuth()

  return (
    <div className="h-full flex flex-col w-16">
      <div className="flex flex-col bg-gray-800 rounded-xl shadow-md flex-grow pt-1 text-white  overflow-y-auto">
        <Link to="#" className="block p-2 mb-1">
          <InboxIcon className="bg-gray-700 rounded-md p-2" />
        </Link>
        <Link to="/" className="block p-2 mb-1">
          <HomeIcon
            className={classNames(
              'rounded-md p-2',
              location.pathname === '/' ? 'bg-gray-200 text-gray-700' : 'bg-gray-700 hover:bg-gray-500',
            )}
          />
        </Link>
        <Link to="#" className="block p-2 mb-1">
          <CalendarIcon className="bg-gray-700 rounded-md p-2" />
        </Link>
        <Link to="#" className="block p-2 mb-1">
          <UserGroupIcon className="bg-gray-700 rounded-md p-2" />
        </Link>
        <Link to="/profile" className="block p-2 mb-1">
          <UserIcon
            className={classNames(
              'rounded-md p-2',
              location.pathname === '/profile' ? 'bg-gray-200 text-gray-700' : 'bg-gray-700 hover:bg-gray-500',
            )}
          />
        </Link>

        <div className="flex-grow"></div>

        <Link to="/" onClick={auth.signout} className="block p-2 mb-1">
          <LogoutIcon className="bg-gray-700 rounded-md p-2" />
        </Link>
      </div>
    </div>
  )
}
