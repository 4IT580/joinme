import { gql } from '@apollo/client'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useUser } from '../utils/user'

export default function ChatMessage({ message }) {
  const user = useUser()

  const isCurrentUser = user.profile.id === message.user.id

  return (
    <div className={classNames('flex flex-col', isCurrentUser ? 'items-end' : 'items-start')}>
      <div className="px-2 pb-1">
        <strong>{message.user.name}</strong>
        <Link to={`/user/${message.user.id}`} className="ml-2 hover:underline">
          @{message.user.username}
        </Link>
      </div>
      <div className={classNames('border rounded-xl p-2', isCurrentUser ? 'bg-primary text-white' : 'bg-white')}>
        {message.text}
      </div>
    </div>
  )
}

ChatMessage.fragments = {
  message: (name = 'message') => gql`
    fragment ${name} on Message {
      id
      text
      user {
        id
        name
        username
      }
    }
  `,
}
