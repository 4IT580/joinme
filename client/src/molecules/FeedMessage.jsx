import { gql } from '@apollo/client'
import classNames from 'classnames'

export default function FeedMessage({ message }) {
  const createdAt = new Date(message.createdAt)

  let isToday = createdAt.toDateString() === new Date().toDateString()
  let timeOrDate = isToday
    ? createdAt.getHours().toString().padStart(2, '0') + ':' + createdAt.getMinutes().toString().padStart(2, '0')
    : createdAt.toDateString()

  return (
    <div className={classNames('flex flex-col', 'items-start')}>
      <div className="">{timeOrDate}</div>
      <div className={classNames('border rounded-xl p-2', 'bg-white')}>{message.text}</div>
    </div>
  )
}

FeedMessage.fragments = {
  message: (name = 'message') => gql`
    fragment ${name} on Message {
      id
      text
      createdAt
      user {
        id
      }
    }
  `,
}
