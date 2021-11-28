import { gql, useQuery } from '@apollo/client'
import DashboardLayout from '../organisms/DashboardLayout'
import InboxTemplate from '../templates/InboxTemplate'

export default function Inbox() {
  const { data, refetch } = useQuery(query)

  return <DashboardLayout>{data && <InboxTemplate invitations={data.invitations} refetch={refetch} />}</DashboardLayout>
}

const query = gql`
  query {
    invitations {
      ...invitation
    }
  }

  ${InboxTemplate.fragments.invitation()}
`
