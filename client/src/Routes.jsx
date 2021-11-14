import { Switch, Route } from 'react-router-dom'
import { useAuth } from './utils/auth'
import LandingPage from './pages/LandingPage'
import ResetPassword from './pages/ResetPassword'
import ActivateAccount from './pages/ActivateAccount'
import Dashboard from './pages/Dashboard'
import UserProfileDashboard from './pages/UserProfileDashboard'

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
      <Route path="/profile">{auth.token ? <UserProfileDashboard /> : <LandingPage />}</Route>
      <Route path="/">{auth.token ? <Dashboard /> : <LandingPage />}</Route>
    </Switch>
  )
}
