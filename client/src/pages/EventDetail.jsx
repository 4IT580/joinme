import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import DashboardLayout from '../organisms/DashboardLayout'
import EventDetailTemplate from '../templates/EventDetailTemplate'
import { useNotifications } from '../utils/notifications'
import SimilarEvents from '../organisms/SimilarEvents'

export default function EventDetail() {
  const notifications = useNotifications()
  const history = useHistory()
  const { id } = useParams()
  const { data, error } = useQuery(query, { variables: { id: parseInt(id) } })

  useEffect(() => {
    if (error) {
      notifications.pushError({ text: error.message })
      history.replace('/')
    }
  }, [error])

  return <DashboardLayout>
    <div className="grid grid-cols-9 gap-1.5 p-1">
    <div className="flex flex-col col-span-9 lg:col-span-7 p-2"> {data?.event && <EventDetailTemplate event={data.event} />} </div>
    <div className="flex flex-col col-span-9 lg:col-span-2"><SimilarEvents/></div>
    </div>
    </DashboardLayout>

}

const query = gql`
  query ($id: Int!) {
    event(id: $id) {
      ...event
    }
  }

  ${EventDetailTemplate.fragments.event()}
`
