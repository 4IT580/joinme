import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useRouteQuery } from '../Hooks'

const ACTIVATE_ACCOUNT_MUTATION = gql`
  mutation ($secret: String!, $password: String!) {
    resetPassword(secret: $secret, password: $password)
  }
`

export default function ActivateAccount() {
  const { secret } = useRouteQuery()
  const [activateAccount, activateAccountState] = useMutation(ACTIVATE_ACCOUNT_MUTATION)

  useEffect(async () => {
    const ok = await activateAccount({
      variables: {
        secret,
      },
    })

    if (ok) alert('Account activated')
  }, [])

  return <div>Activate account</div>
}
