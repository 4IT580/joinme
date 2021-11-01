import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'

const ACTIVATE_ACCOUNT_MUTATION = gql`
  mutation ($secret: String!, $password: String!) {
    resetPassword(secret: $secret, password: $password)
  }
`

function useQuery() {
  return Object.fromEntries(new URLSearchParams(useLocation().search))
}

export default function ActivateAccount() {
  const { secret } = useQuery()
  const [activateAccount, activateAccountState] = useMutation(ACTIVATE_ACCOUNT_MUTATION)

  useEffect(async () => {
    const ok = await activateAccount({
      variables: {
        secret,
      },
    })

    if (ok) alert('Account activated')
  }, [])
}
