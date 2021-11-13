import classNames from 'classnames'
import { gql, useQuery } from '@apollo/client'
import Dropdown from '../atoms/Dropdown'
import { useAuth } from '../utils/auth'
import { useEffect } from 'react'

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`

export default function AccountDropdown({ className }) {
  const auth = useAuth()
  const { data } = useQuery(ME_QUERY)

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Dropdown className={classNames(className)} title={`Hey, ${(auth.user || {}).name}`}>
      <Dropdown.Item onClick={auth.signout}>Logout</Dropdown.Item>
    </Dropdown>
  )
}
