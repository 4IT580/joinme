import { gql, useQuery } from '@apollo/client'
import DashboardLayout from '../organisms/DashboardLayout'
import CalendarTemplate from '../templates/CalendarTemplate'

export default function Calendar(props) {
  const { data } = useQuery(query)

  return (
    <DashboardLayout>
      {data && <CalendarTemplate attending={data.attending} organizing={data.organizing} />}
    </DashboardLayout>
  )
}

const query = gql`
  query {
    attending {
      id
      name
      place
      description
      from
      to
      file {
        path
      }
      user {
        id
        name
      }
      attendees {
        id
        name
      }
    }
    organizing {
      id
      name
      place
      description
      from
      to
      file {
        path
      }
      user {
        id
        name
      }
      attendees {
        id
        name
      }
    }
  }
`
