import DashboardLayout from '../organisms/DashboardLayout'
import MainDashboard from './MainDashboard'
import AccountInfo from '../organisms/AccountInfo'
import EventsDashboard from './Events'

export default function Dashboard(props) {
  return (
    <DashboardLayout>
      { props.name === 'main' && <MainDashboard /> }
      { props.name === 'profile' && <AccountInfo /> }
      { props.name === 'events' && <EventsDashboard /> }

    </DashboardLayout>
  )
}
