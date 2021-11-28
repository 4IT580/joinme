import { gql } from '@apollo/client'
import Button from '../atoms/Button'
import InvitationCard from '../molecules/InvitationCard'

export default function InboxTemplate({ invitations, refetch }) {
  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      <div className="flex flex-col gap-y-2 col-span-5 md:col-span-1">
        <Button className="flex">Invitations</Button>
        <Button className="flex">Requests</Button>
      </div>
      <div className="col-span-5 md:col-span-4 bg-gray-100 rounded-2xl p-4">
        <h1 className="text-xl font-bold mb-4">October, 2021</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} refetch={refetch} />
          ))}
        </div>
      </div>
    </div>
  )
}

InboxTemplate.fragments = {
  invitation: (name = 'invitation') => gql`
    fragment ${name} on Invitation {
      id
      event {
        id
        name
        place
        from
        to
        file{
          path
        }
      }
    }
  `,
}
