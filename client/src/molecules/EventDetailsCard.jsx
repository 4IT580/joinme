import Title from '../atoms/Title'
import Card from '../atoms/Card'
import EventAttendees from './EventAttendees'
import { parsePlace } from '../Utils'

export default function EventDetailsCard({ event }) {
  const place = parsePlace(event.place)

  return (
    <>
      <img src={event.file.path} className="object-cover" />
      <div className="my-2">
        Date: {new Date(event.from).toLocaleDateString()} - {new Date(event.to).toLocaleDateString()}
      </div>
      <Title level={2}>{event.name}</Title>
      <Title level={3}>at {place.name}</Title>
      <Card className="mb-2">
        <strong>Description</strong>
        <p>{event.description}</p>
      </Card>
      <EventAttendees attendees={event.attendees} />
    </>
  )
}
