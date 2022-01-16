import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Button from '../atoms/Button'
import EventCard from '../molecules/EventCard'
import PlacesOffersCard from '../molecules/PlacesOffersCard'
import CreateEventModal from '../organisms/CreateEventModal'
import DashboardLayout from '../organisms/DashboardLayout'
import { parsePlace } from '../Utils'

const EVENTY_QUERY = gql`
  query {
    events {
      id
      name
      place
      description
      from
      to
      file {
        path
      }
    }
    promotedEvents {
      id
      name
      place
      description
      from
      to
      file {
        path
      }
    }
  }
`

export default function Dashboard() {
  const { data, refetch } = useQuery(EVENTY_QUERY)
  const [isCreateEventModalVisible, setIsCreateEventModalVisible] = useState(false)

  return (
    <DashboardLayout>
      <div className="grid grid-cols-6 gap-2 p-1">
        <div className="flex flex-col col-span-6 lg:col-span-4 p-2">
          <div className="flex flex-row items-center justify-between mb-4 h-16">
            <h1 className="text-2xl font-extrabold">Events in your area</h1>
            <Button className="ml-2 btn-primary uppercase" onClick={() => setIsCreateEventModalVisible(true)}>
              Create event
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data?.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
        <div className="flex flex-col col-span-6 lg:col-span-2 p-2">
          <div className="flex flex-row items-center mb-4 h-16">
            <h1 className="px-4 text-2xl font-extrabold">Promoted events</h1>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data?.promotedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>

      {isCreateEventModalVisible && (
        <CreateEventModal refetch={refetch} onClose={() => setIsCreateEventModalVisible(false)} />
      )}
    </DashboardLayout>
  )
}
