import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import { useNotifications } from '../utils/notifications'

export default function Notification({ id, type, title, text }) {
  const notifications = useNotifications()

  const remove = () => notifications.remove({ id })

  useEffect(() => {
    const timeout = setTimeout(remove, 5000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{getIcon(type)}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{text}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              onClick={remove}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const getIcon = (type) => {
  if (type === 'SUCCESS') return <CheckCircleIcon className="h-6 w-6 text-green-400" />
  if (type === 'ERROR') return <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
  return <InformationCircleIcon className="h-6 w-6 text-blue-400" />
}
