import { gql, useMutation } from '@apollo/client'
import classNames from 'classnames'
import { useNotifications } from '../utils/notifications'
import Button from '../atoms/Button'
import { parsePlace } from '../Utils'

export default function InvitationCard({ invitation, refetch, className }) {
  const notifications = useNotifications()
  const [accept, acceptState] = useMutation(acceptMutation)
  const [decline, declineState] = useMutation(declineMutation)

  const onAccept = async () => {
    await accept({ variables: { invitationId: invitation.id } })
    notifications.pushSuccess({ text: 'Invitation accepted' })
    await refetch()
  }

  const onDecline = async () => {
    await decline({ variables: { invitationId: invitation.id } })
    notifications.pushSuccess({ text: 'Invitation declined' })
    await refetch()
  }

  return (
    <div className={classNames('card shadow-lg flex bg-white text-sm', className)}>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row">
        <img
          className="rounded-2xl h-36 w-36 m-4 object-cover"
          src={`https://picsum.photos/400/250?id${invitation.id}`}
        />
        <div className="flex flex-grow flex-col">
          <p className="flex px-4 pt-4">{invitation.event.from}</p>
          <h2 className="flex font-bold text-xl px-4">{invitation.event.name}</h2>
          <p className="flex px-4">{parsePlace(invitation.event.place).name}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between p-4 gap-4">
        <Button className="btn-primary flex flex-grow" loading={acceptState.loading} onClick={onAccept}>
          Accept
        </Button>
        <Button className="flex flex-grow" loading={declineState.loading} onClick={onDecline}>
          Decline
        </Button>
      </div>
    </div>
  )
}

const acceptMutation = gql`
  mutation ($invitationId: Int!) {
    acceptInvitation(invitationId: $invitationId)
  }
`

const declineMutation = gql`
  mutation ($invitationId: Int!) {
    declineInvitation(invitationId: $invitationId)
  }
`
