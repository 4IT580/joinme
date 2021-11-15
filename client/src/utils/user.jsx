import { createContext, useContext } from 'react'
import { useQuery, gql } from '@apollo/client'

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
  const { data, refetch } = useQuery(ME_QUERY)

  const value = {
    profile: data?.me,
    refetch: refetch,
  }

  return <UserContext.Provider value={value}>{data && children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
