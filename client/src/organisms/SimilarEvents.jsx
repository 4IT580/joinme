import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import EventCard from '../molecules/EventCard'

const EVENTY_QUERY = gql`
  query {
    events {
      id
      name
      place
      description
      from
      to
    }
  }
`
export default function SimilarEvents() {
  const { data, refetch } = useQuery(EVENTY_QUERY)

  return (
    <div className="flex flex-col col-span-6 lg:col-span-2 p-2">
      <h1 className="text-2xl font-extrabold pb-2">Similar events</h1>
      <div className="grid grid-cols-1 gap-4">
        {data?.events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
