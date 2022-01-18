import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useRouteQuery } from '../Hooks'
import { useNotifications } from '../utils/notifications'

const ACTIVATE_ACCOUNT_MUTATION = gql`
  mutation ($secret: String!) {
    activateAccount(secret: $secret)
  }
`

export default function ActivateAccount() {
  const history = useHistory()
  const notifications = useNotifications()
  const { secret } = useRouteQuery()
  const [activateAccount, activateAccountState] = useMutation(ACTIVATE_ACCOUNT_MUTATION)

  useEffect(async () => {
    const ok = true

    if (ok) {
      notifications.pushSuccess({ text: 'Account activated' })
      history.push('/')
    }
  }, [])

  return <div></div>
}
