import { createContext, useContext, useState } from 'react'

const NotificationsContext = createContext()

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [id, setId] = useState(1)

  const getId = () => {
    const _id = id
    setId(id => id + 1)
    return _id
  }

  const pushNotification = (notification) =>
    setNotifications((notifications) => [...notifications, { ...notification, id: getId() }])
  const pushSuccess = (notification) => pushNotification({ title: 'Success', ...notification, type: 'SUCCESS' })
  const pushError = (notification) => pushNotification({ title: 'Error', ...notification, type: 'ERROR' })
  const remove = ({ id }) =>
    setNotifications((notifications) => notifications.filter((notification) => notification.id !== id))

  const value = {
    notifications,
    pushSuccess,
    pushError,
    remove,
  }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export const useNotifications = () => useContext(NotificationsContext)
