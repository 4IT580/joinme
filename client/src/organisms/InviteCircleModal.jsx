import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import { useNotifications } from '../utils/notifications'

export default function InviteCircleModal({ event, refetch, onClose }) {
  const notifications = useNotifications()
  const { data } = useQuery(circlesQuery)
  const [inviteCircle, inviteCircleState] = useMutation(inviteCircleMutation)

  return (
    <Modal>
      <Title>Invite circle to the {event.name} event</Title>
      <div className="mt-4 flex flex-col gap-4">
        {data?.myCircles.map((circle) => (
          <Button
            key={circle.id}
            onClick={async () => {
              await inviteCircle({ variables: { circleId: circle.id, eventId: event.id } })
              notifications.pushSuccess({ text: `Circle ${circle.name} invited!` })
              onClose()
            }}
          >
            {circle.name}
          </Button>
        ))}
      </div>
      <Button className="mt-4" onClick={onClose}>
        Cancel
      </Button>
    </Modal>
  )
}

const circlesQuery = gql`
  query {
    myCircles {
      id
      name
    }
  }
`

const inviteCircleMutation = gql`
  mutation ($circleId: Int!, $eventId: Int!) {
    inviteCircle(circleId: $circleId, eventId: $eventId)
  }
`
