import { BrowserRouter } from 'react-router-dom'
import { NotificationsProvider } from './utils/notifications'
import { AuthProvider } from './utils/auth'
import { EnhancedApolloProvider } from './utils/apollo'
import Routes from './Routes'
import Notifications from './organisms/Notifications'

export default function App() {
  return (
    <BrowserRouter>
      <NotificationsProvider>
        <AuthProvider>
          <EnhancedApolloProvider>
            <Routes />

            <Notifications />
          </EnhancedApolloProvider>
        </AuthProvider>
      </NotificationsProvider>
    </BrowserRouter>
  )
}
