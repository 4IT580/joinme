import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import DashboardLayout from '../organisms/DashboardLayout'
import UserDetailTemplate from '../templates/UserDetailTemplate'
import { useNotifications } from '../utils/notifications'

export default function UserDetail() {
  const notifications = useNotifications()
  const history = useHistory()
  const { id } = useParams()
  const { data, error } = useQuery(query, { variables: { id: parseInt(id) } })

  useEffect(() => {
    if (error) {
      notifications.pushError({ text: error.message })
      history.replace('/')
    }
  }, [error])

  return <DashboardLayout>{data?.user && <UserDetailTemplate user={data.user} />}</DashboardLayout>
}

const query = gql`
  query ($id: Int!) {
    user(id: $id) {
      ...user
    }
  }

  ${UserDetailTemplate.fragments.user()}
`
