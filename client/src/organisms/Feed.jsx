import { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import FeedMessage from '../molecules/FeedMessage'

export default function Feed({ event }) {
  const { subscribeToMore, data } = useQuery(query, { variables: { eventId: event.id } })

  useEffect(() => {
    subscribeToMore({
      document: subscription,
      variables: { eventId: event.id },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev)

        if (!subscriptionData.data) return prev

        const newMessage = subscriptionData.data.messageSent

        return Object.assign({}, prev, { messages: [...prev.messages, newMessage] })
      },
    })
  }, [])

  if (!data) return null

  return (
    <div className="flex flex-col gap-4">
      {data.messages
        .filter((message) => message.user.id === event.user.id)
        .map((message) => (
          <FeedMessage key={message.id} message={message} />
        ))}
    </div>
  )
}

const query = gql`
  query ($eventId: Int!) {
    messages(eventId: $eventId) {
      ...message
    }
  }

  ${FeedMessage.fragments.message()}
`

const subscription = gql`
  subscription ($eventId: Int!) {
    messageSent(eventId: $eventId) {
      ...message
    }
  }

  ${FeedMessage.fragments.message()}
`
