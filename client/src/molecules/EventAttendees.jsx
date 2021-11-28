import { Link } from 'react-router-dom'
import Title from '../atoms/Title'

export default function EventAttendees({ attendees }) {
  return (
    <div className="flex flex-col col-span-5 lg:col-span-2 bg-white rounded-2xl p-4">
      <Title level="2">Attendees</Title>
      <div>
        {attendees.map((attendee) => (
          <Link
            key={attendee.id}
            to={`/user/${attendee.id}`}
            className="w-8 h-8 text-center p-1 border rounded-full bg-blue-200 mr-2"
          >
            <strong>{getName(attendee)}</strong>
          </Link>
        ))}
      </div>
    </div>
  )
}

const getName = (attendee) => {
  return attendee.name
    .split(' ')
    .map((part) => part[0])
    .join('')
}
