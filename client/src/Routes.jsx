import { Switch, Route } from 'react-router-dom'
import { useAuth } from './utils/auth'
import LandingPage from './pages/LandingPage'
import ResetPassword from './pages/ResetPassword'
import ActivateAccount from './pages/ActivateAccount'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'
import EventDetail from './pages/EventDetail'

export default function Routes() {
  const auth = useAuth()

  return (
    <Switch>
      <Route path="/reset-password">
        <ResetPassword />
      </Route>
      <Route path="/activate-account">
        <ActivateAccount />
      </Route>
      {auth.token && (
        <Route path="/profile">
          <UserProfile />
        </Route>
      )}
      <Route path="/event/:id">
        <EventDetail />
      </Route>
      <Route path="/">{auth.token ? <Dashboard /> : <LandingPage />}</Route>
    </Switch>
  )
}
