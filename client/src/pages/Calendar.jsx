import { gql, useQuery } from '@apollo/client'
import DashboardLayout from '../organisms/DashboardLayout'
import CalendarTemplate from '../templates/CalendarTemplate'

export default function Calendar(props) {
  const { data } = useQuery(query)

  return <DashboardLayout>{data && <CalendarTemplate events={data.events} />}</DashboardLayout>
}

const query = gql`
  query {
    events {
      id
      name
      description
      from
      to
    }
  }
`
