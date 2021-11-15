import { createContext, useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useAuth } from './auth'

const ME_QUERY = gql`
  query {
    me {
      name
      username
      city
      description
      interests
      photo
    }
  }
`

const UserContext = createContext()

export function UserProvider({ children }) {
  const auth = useAuth()
  const { data, refetch, error } = useQuery(ME_QUERY)

  if (error) auth.signout()

  const value = {
    profile: data?.me,
    refetch: refetch,
  }

  return <UserContext.Provider value={value}>{data && children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
