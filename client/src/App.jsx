import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ResetPassword from './pages/ResetPassword'
import ActivateAccount from './pages/ActivateAccount'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/activate-account">
          <ActivateAccount />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
