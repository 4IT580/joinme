import { Switch, Route } from 'react-router-dom'
import { useAuth } from './utils/auth'
import LandingPage from './pages/LandingPage'
import ResetPassword from './pages/ResetPassword'
import ActivateAccount from './pages/ActivateAccount'
import EmptyDashboard from './pages/EmptyDashboard'

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
      <Route path="/dashboard"><EmptyDashboard /></Route>
      <Route path="/">{auth.token ? <EmptyDashboard /> : <LandingPage />}</Route>
    </Switch>
  )
}
