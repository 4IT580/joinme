import { gql, useMutation } from '@apollo/client'
import Button from '../atoms/Button'
import { useNotifications } from '../utils/notifications'

export default function JoinEventButton({ event, refetch }) {
  const notifications = useNotifications()
  const [joinEvent] = useMutation(mutation, { variables: { eventId: event.id } })

  const onJoinEvent = async () => {
    const { data } = await joinEvent()

    if (data?.joinEvent) {
      notifications.pushSuccess({ text: 'Joined event' })
    } else {
      notifications.pushError({ text: 'Cannot join event' })
    }

    await refetch()
  }

  return (
    <Button className="btn-primary px-16" onClick={onJoinEvent}>
      Join event
    </Button>
  )
}

const mutation = gql`
  mutation ($eventId: Int!) {
    joinEvent(eventId: $eventId)
  }
`
