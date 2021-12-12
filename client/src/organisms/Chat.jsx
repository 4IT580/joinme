import { gql, useQuery, useMutation } from '@apollo/client'
import Title from '../atoms/Title'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import ChatMessage from '../molecules/ChatMessage'
import { useEffect, useState } from 'react'

export default function Chat({ event }) {
  const { subscribeToMore, data } = useQuery(query, { variables: { eventId: event.id } })
  const [sendMessage] = useMutation(mutation)
  const [input, setInput] = useState('')

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

  const onInput = (e) => {
    e.preventDefault()

    setInput(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    await sendMessage({ variables: { input: { text: input, eventId: event.id } } })

    setInput('')
  }

  return (
    <div className="flex flex-col gap-4">
      <form className="flex gap-4" onSubmit={onSubmit}>
        <Input className="flex-grow" value={input} onInput={onInput} />
        <Button type="submit" className="btn-primary">
          Send
        </Button>
      </form>
      {data.messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
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

  ${ChatMessage.fragments.message()}
`

const mutation = gql`
  mutation ($input: MessageInput!) {
    sendMessage(input: $input) {
      id
      text
    }
  }
`

const subscription = gql`
  subscription ($eventId: Int!) {
    messageSent(eventId: $eventId) {
      ...message
    }
  }

  ${ChatMessage.fragments.message()}
`
