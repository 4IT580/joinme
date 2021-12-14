import { Switch, Route } from 'react-router-dom'
import { useAuth } from './utils/auth'
import LandingPage from './pages/LandingPage'
import ResetPassword from './pages/ResetPassword'
import ActivateAccount from './pages/ActivateAccount'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'
import EventDetail from './pages/EventDetail'
import Inbox from './pages/Inbox'
import UserDetail from './pages/UserDetail'
import Calendar from './pages/Calendar'
import EditCircle from './pages/EditCircle'

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
      {auth.token && (
        <Route path="/calendar">
          <Calendar />
        </Route>
      )}
      {auth.token && (
        <Route path="/inbox">
          <Inbox />
        </Route>
      )}
      {auth.token && (
        <Route path="/circle">
          <EditCircle />
        </Route>
      )}
      <Route path="/event/:id">
        <EventDetail />
      </Route>
      <Route path="/user/:id">
        <UserDetail />
      </Route>
      <Route path="/">{auth.token ? <Dashboard /> : <LandingPage />}</Route>
    </Switch>
  )
}
