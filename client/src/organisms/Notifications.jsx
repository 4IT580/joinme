import Notification from '../molecules/Notification'
import { useNotifications } from '../utils/notifications'

export default function Notifications() {
  const { notifications } = useNotifications()

  return (
    <div
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      style={{ zIndex: 9999 }}
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end lg:pt-16">
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  )
}
