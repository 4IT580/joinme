import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import DashboardLayout from '../organisms/DashboardLayout'
import EventDetailTemplate from '../templates/EventDetailTemplate'
import { useNotifications } from '../utils/notifications'

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

  return <DashboardLayout>{data?.event && <EventDetailTemplate event={data.event} />}</DashboardLayout>
}

const query = gql`
  query ($id: Int!) {
    event(id: $id) {
      ...event
    }
  }

  ${EventDetailTemplate.fragments.event()}
`
