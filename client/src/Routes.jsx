import { Switch, Route } from 'react-router-dom'
import { useAuth } from './utils/auth'
import LandingPage from './pages/LandingPage'
import ResetPassword from './pages/ResetPassword'
import ActivateAccount from './pages/ActivateAccount'
import Dashboard from './pages/Dashboard'
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
        <>
          <Route path="/profile">
            <Dashboard name={'profile'} />
          </Route>
          <Route path="/events">
            <Dashboard name={'events'} />
          </Route>
        </>

      )}
      <Route path="/event/:id">
        <EventDetail />
      </Route>
      <Route path="/">{auth.token ? <Dashboard name={'main'}/> : <LandingPage />}</Route>
    </Switch>
  )
}
