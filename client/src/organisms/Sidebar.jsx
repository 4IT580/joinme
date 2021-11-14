import image from '../assets/logo_pink_nobackground.png'
import classNames from 'classnames'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../utils/auth'
import { useEffect } from 'react'
import MenuButtons from '../molecules/MenuButtons'

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`

export default function Sidebar() {
  const auth = useAuth()
  const { data } = useQuery(ME_QUERY)
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="bg-ourblack rounded-3xl w-20 h-full p-1 content-between">
      <MenuButtons />
<button type="button" 
onClick={auth.signout}
            className=" bg-graymenubutton rounded-xl w-14 h-14 ml-2 mb-3">
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout p-3"  viewBox="0 0 24 24" stroke-width="1.2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
  <path d="M7 12h14l-3 -3m0 6l3 -3" />
</svg>
</button>
    </div>
  )
}
