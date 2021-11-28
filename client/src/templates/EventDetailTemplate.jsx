import { gql } from '@apollo/client'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../utils/user'
import Button from '../atoms/Button'
import Title from '../atoms/Title'
import EventDescription from '../molecules/EventDescription'
import EventAttendees from '../molecules/EventAttendees'
import ShareEventModal from '../organisms/ShareEventModal'
import JoinEventButton from '../molecules/JoinEventButton'

export default function EventDetailTemplate({ event, refetch }) {
  const user = useUser()
  const history = useHistory()

  const [isShareEventModalOpen, setIsShareEventModalOpen] = useState(false)

  const from = new Date(event.from).toLocaleString()
  const to = new Date(event.to).toLocaleString()
  const isAttending = !!event.attendees.some((attendee) => attendee.id === user.profile.id)

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-gray-200 mt-1">
        <div className="flex flex-row">
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex justify-start p-4">
              <ArrowLeftIcon
                className="cursor-pointer p-4 h-16 text-white bg-gray-400 rounded-2xl"
                onClick={() => history.goBack()}
              />
            </div>
            <div className="flex flex-col p-4">
              <div className="flex flex-row justify-between">
                <p>
                  From {from} Till {to}
                </p>
                <div className="badge badge-outline">{event.public ? 'public' : 'private'}</div>
              </div>
              <div className="pb-2 pt-2">
                <Title>{event.name}</Title>
              </div>
              <div>{event.place}</div>
            </div>
            <div className="flex flex-row gap-4 p-4">
              {!isAttending && <JoinEventButton event={event} refetch={refetch} />}
              <Button onClick={() => setIsShareEventModalOpen(true)}>Share event</Button>
            </div>
          </div>
          <div className="p-4">
            <img className="rounded-2xl" src={`https://picsum.photos/600/450?id${event.id}`} />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 p-4">
          <EventDescription description={event.description} />
          <EventAttendees attendees={event.attendees} />
        </div>
      </div>

      {isShareEventModalOpen && <ShareEventModal onClose={() => setIsShareEventModalOpen(false)} />}
    </>
  )
}

EventDetailTemplate.fragments = {
  event: (name = 'event') => gql`
    fragment ${name} on Event {
      id
      name
      place
      from
      to
      public
      description
      attendees {
        id
        name
      }
    }
  `,
}
