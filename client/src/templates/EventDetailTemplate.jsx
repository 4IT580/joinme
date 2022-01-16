import { gql, useMutation } from '@apollo/client'
import { ArrowLeftIcon, CogIcon, GiftIcon, QrcodeIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { parsePlace } from '../Utils'
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
import CouponsModal from '../organisms/CouponsModal'
import CouponsAdminModal from '../organisms/CouponsAdminModal'
import PromoteEventModal from '../organisms/PromoteEventModal'

const intl = new Intl.DateTimeFormat('cs-CZ', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export default function EventDetailTemplate({ event, refetch }) {
  const user = useUser()
  const history = useHistory()

  const [isShareEventModalOpen, setIsShareEventModalOpen] = useState(false)
  const [isUpdateEventModalOpen, setIsUpdateEventModalOpen] = useState(false)
  const [isInviteCircleModalOpen, setIsInviteCircleModalOpen] = useState(false)
  const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false)
  const [isCouponsAdminModalOpen, setIsCouponsAdminModalOpen] = useState(false)
  const [isPromoteEventModalOpen, setIsPromoteEventModalOpen] = useState(false)

  const place = parsePlace(event.place)
  const from = intl.format(new Date(event.from))
  const to = intl.format(new Date(event.to))
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
                className="cursor-pointer h-12 rounded-lg p-1 md:h-16 md:rounded-2xl md:p-4 text-white bg-gray-400"
                onClick={() => history.goBack()}
              />
              {isOwner && (
                <CogIcon
                  className="cursor-pointer h-12 rounded-lg p-1 md:h-16 md:rounded-2xl md:p-4 text-white bg-gray-400"
                  onClick={() => setIsUpdateEventModalOpen(true)}
                />
              )}
              <GiftIcon
                className="cursor-pointer h-12 rounded-lg p-1 md:h-16 md:rounded-2xl md:p-4 text-white bg-gray-400"
                onClick={() => setIsCouponsModalOpen(true)}
              />
              {isOwner && (
                <QrcodeIcon
                  className="cursor-pointer h-12 rounded-lg p-1 md:h-16 md:rounded-2xl md:p-4 text-white bg-gray-400"
                  onClick={() => setIsCouponsAdminModalOpen(true)}
                />
              )}
            </div>
            <div className="flex flex-col p-4">
              <div className="flex flex-row justify-between">
                <p>
                  Date: {from} - {to}
                </p>
                <div className="badge badge-outline">{event.public ? 'public' : 'private'}</div>
              </div>
              <div className="pb-2 pt-2">
                <Title>{event.name}</Title>
              </div>
              <a href={place.url} className="text-primary hover:underline" target="_blank">
                {place.name}
              </a>
            </div>
            <div className="flex flex-wrap flex-row gap-4 p-4">
              {!isAttending && <JoinEventButton event={event} refetch={refetch} />}
              <Button onClick={() => setIsShareEventModalOpen(true)}>Share event</Button>
              <Button onClick={() => setIsInviteCircleModalOpen(true)}>Invite circle</Button>
              {isOwner && !event.promoted && (
                <Button onClick={() => setIsPromoteEventModalOpen(true)}>Promote event</Button>
              )}
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
      {isCouponsModalOpen && <CouponsModal event={event} onClose={() => setIsCouponsModalOpen(false)} />}
      {isCouponsAdminModalOpen && (
        <CouponsAdminModal event={event} refetch={refetch} onClose={() => setIsCouponsAdminModalOpen(false)} />
      )}
      {isPromoteEventModalOpen && (
        <PromoteEventModal event={event} refetch={refetch} onClose={() => setIsPromoteEventModalOpen(false)} />
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
      promoted
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
      coupons {
        id
        name
        value
      }
    }
  `,
}
