import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import EventCard from '../molecules/EventCard'
import EventMiniCard from '../molecules/EventMiniCard'
import EventDetails from '../organisms/EventDetails'

const EVENTS_QUERY = gql`
  query {
    events {
      id
      name
      place
      description
      from
      to
      public
      user {
        id
        name
        email
      }
    }
  }
`
export default function EventsDashboard(props) {
  const [tab, setTab] = useState('joined')
  const [active, setActive] = useState(null)
  // const { data, refetch } = useQuery(EVENTS_QUERY)

  const joinedEvents = [{
    id: 0,
    name: 'ComicCon',
    place: 'São Paulo',
    description: 'ComicCon description',
    from: '2021-12-01T12:30',
    to: '2021-12-02T18:30',
    public: true,
    user: {
      id: 0,
      name: 'Jon',
      email: 'mail@mail.com',
    },
  }, {
    id: 1,
    name: 'Event Type 2',
    place: 'Praha',
    description: 'Test description',
    from: '2021-05-01T12:30',
    to: '2021-05-02T12:30',
    public: true,
    user: {
      id: 1,
      name: 'Test',
      email: 'test@mail.com',
    },
  }]
  const myEvents = [{
    id: 0,
    name: 'ComicCon',
    place: 'São Paulo',
    description: 'ComicCon description',
    from: '2021-12-01T12:30',
    to: '2021-12-02T18:30',
    public: true,
    user: {
      id: 0,
      name: 'Jon',
      email: 'mail@mail.com',
    },
  }]
  useEffect(() => {
    if (myEvents === undefined) return
  }, [myEvents, joinedEvents])

  return (
    <div className={ 'flex h-full flex-row' }>
      <div className='bordered rounded-xl bg-gray-200 m-2 pt-4 pb-2 px-4 w-96 max-w-md'>
        <h1 className={ 'text-3xl font-bold' }>Events</h1>
        <div className='w-full flex flex-row justify-around py-4'>
          <div onClick={ () => setTab('joined') } className={ `border-black cursor-pointer bordered rounded-xl px-4 p-2 mr-2 w-1/2 text-center ${ tab === 'joined' ? 'bg-gray-900 text-white' : 'bg-white' }` }>
            <span className='text-bold'>Joined</span>
          </div>
          <div onClick={ () => setTab('myEvents') } className={ `border-black cursor-pointer bordered rounded-xl px-4 p-2 ml-2 w-1/2 text-center ${ tab === 'myEvents' ? 'bg-gray-900 text-white' : 'bg-white' }` }>
            <span className='text-bold'>My Events</span>
          </div>
        </div>

        <div>
          { tab === 'joined' && <div>
            { joinedEvents.map(e => <EventMiniCard event={ e } key={ e.id } onClick={ () => setActive(e) } />) }
          </div> }
          { tab === 'myEvents' && <div>
            { myEvents.map(e => <EventMiniCard event={ e } key={ e.id } onClick={ () => setActive(e) } />) }
          </div> }
        </div>
      </div>
      <div className='rounded-xl bg-gray-500 m-2 p-4 w-1/2'>chat</div>
      <div className='rounded-xl bg-blue-50 m-2 p-2 w-1/3 border-blue-800 bordered'>
        { active && <EventDetails event={ active } /> }
      </div>
    </div>
  )

}
