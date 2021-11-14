import classNames from 'classnames'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../utils/auth'
import { useEffect } from 'react'

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`
export default function Greeting({ className }) {
    const auth = useAuth()
    const { data } = useQuery(ME_QUERY)
  
    useEffect(() => {
      console.log(data)
    }, [data])
  
    return (
     <div className="text-xl mt-1"> {`Hey, ${auth.user.name}`}</div>
        
    )
  }
