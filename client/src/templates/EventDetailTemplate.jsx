import { gql, useMutation } from '@apollo/client'
import { ArrowLeftIcon, CogIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../utils/user'
import Button from '../atoms/Button'
import Title from '../atoms/Title'
import EventDescription from '../molecules/EventDescription'
import EventAttendees from '../molecules/EventAttendees'
import JoinEventButton from '../molecules/JoinEventButton'
import Chat from '../organisms/Chat'
import ShareEventModal from '../organisms/ShareEventModal'
import UpdateEventModal from '../organisms/UpdateEventModal'
import InviteCircleModal from '../organisms/InviteCircleModal'

export default function EventDetailTemplate({ event, refetch }) {
  const user = useUser()
  const history = useHistory()

  const [isShareEventModalOpen, setIsShareEventModalOpen] = useState(false)
  const [isUpdateEventModalOpen, setIsUpdateEventModalOpen] = useState(false)
  const [isInviteCircleModalOpen, setIsInviteCircleModalOpen] = useState(false)

  const from = new Date(event.from).toLocaleString()
  const to = new Date(event.to).toLocaleString()
  const isOwner = event.user.id === user.profile.id
  const isAttending = !!event.attendees.some((attendee) => attendee.id === user.profile.id)

  const [uploadImageMutation] = useMutation(IMAGE_UPLOAD_QUERY)

  const onPictureSelected = async ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      const newLink = await uploadImageMutation({ variables: { file, eventId: event.id } })

      const image = document.getElementById('event-image')
      image.src = newLink.data.eventImageUpload
    }
  }

  const onPictureClick = () => {
    if (isOwner) {
      const input = document.getElementById('event-image-upload')
      input.click()
    }
  }

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-gray-200 mt-1">
        <div className="flex flex-row">
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex justify-start p-4 gap-4">
              <ArrowLeftIcon
                className="cursor-pointer p-4 h-16 text-white bg-gray-400 rounded-2xl"
                onClick={() => history.goBack()}
              />
              {isOwner && (
                <CogIcon
                  className="cursor-pointer p-4 h-16 text-white bg-gray-400 rounded-2xl"
                  onClick={() => setIsUpdateEventModalOpen(true)}
                />
              )}
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
              <Button onClick={() => setIsInviteCircleModalOpen(true)}>Invite circle</Button>
            </div>
          </div>
          <div className="p-4">
            <input
              id="event-image-upload"
              onChange={onPictureSelected}
              className="hidden"
              type="file"
              accept=".jpg,.gif,.svg,.png"
            />
            <img
              onClick={onPictureClick}
              id="event-image"
              className="rounded-2xl"
              src={event.file?.path ? event.file.path : `https://picsum.photos/600/450?id${event.id}`}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 p-4">
          <EventDescription description={event.description} />
          <EventAttendees attendees={event.attendees} />
        </div>
      </div>

      <div className="bg-gray-200 rounded-2xl p-4 mt-4">
        <Title level={2}>Chat</Title>
        <Chat event={event} />
      </div>

      {isShareEventModalOpen && <ShareEventModal event={event} onClose={() => setIsShareEventModalOpen(false)} />}
      {isUpdateEventModalOpen && (
        <UpdateEventModal event={event} refetch={refetch} onClose={() => setIsUpdateEventModalOpen(false)} />
      )}
      {isInviteCircleModalOpen && (
        <InviteCircleModal event={event} refetch={refetch} onClose={() => setIsInviteCircleModalOpen(false)} />
      )}
    </>
  )
}

const IMAGE_UPLOAD_QUERY = gql`
  mutation ($file: Upload!, $eventId: Int!) {
    eventImageUpload(file: $file, eventId: $eventId)
  }
`

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
      user {
        id
      }
      attendees {
        id
        name
      }
      file{
        path
      }
    }
  `,
}
