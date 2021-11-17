import { gql } from '@apollo/client'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'
import Button from '../atoms/Button'
import Title from '../atoms/Title'

export default function EventDetailTemplate({ event }) {
  const history = useHistory()
  const from = new Date(event.from).toLocaleString()
  const to = new Date(event.to).toLocaleString()

  return (
    <div className="w-1/2 flex flex-col rounded-2xl bg-gray-200 mt-1">
      <div className="flex flex-row">
        <div className="flex flex-col flex-grow justify-between">
          <div className="flex justify-start p-4">
            <ArrowLeftIcon
              className="cursor-pointer p-4 h-16 text-white bg-gray-400 rounded-2xl"
              onClick={() => history.goBack()}
            />
          </div>
          <div className="flex flex-col p-4">
            <div className="flex flex-row justify-between">
              <p>
                From {from} to {to}
              </p>
              <div className="badge badge-outline">{event.public ? 'public' : 'private'}</div>
            </div>
            <div>
              <Title>{event.name}</Title>
            </div>
            <div>{event.place}</div>
          </div>
          <div className="flex flex-row gap-4 p-4">
            <Button className="btn-primary px-16">Join</Button>
            <Button>Share event</Button>
          </div>
        </div>
        <div className="p-4">
          <img className="rounded-2xl" src={`https://picsum.photos/400/400?id${event.id}`} />
        </div>
      </div>
      <div className="flex flex-row p-4 gap-4">
        <div className="w-2/3 bg-white rounded-2xl p-4">
          <Title level="2">Description</Title>
          {event.description}
        </div>
        <div className="w-1/3 bg-white rounded-2xl p-4">
          <Title level="2">Attendees</Title>
        </div>
      </div>
    </div>
  )
}

EventDetailTemplate.fragments = {
  event: (name = 'event') => gql`
    fragment ${name} on Event {
      id
      name
      place
      from
      to
      public
      description
    }
  `,
}
