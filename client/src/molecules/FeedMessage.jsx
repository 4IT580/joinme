import { gql } from '@apollo/client'
import classNames from 'classnames'

export default function FeedMessage({ message }) {
  console.log(message)
  let isToday = message.created_at.toDateString() === new Date().toDateString()
  let timeOrDate = isToday ? message.created_at.getHours().toString().padStart(2, '0') + ':' + message.created_at.getMinutes().toString().padStart(2, '0') : message.created_at.toDateString()
  return (
    <div className={classNames('flex flex-col', 'items-start')}>
      <div className=''>{timeOrDate}</div>
      <div className={classNames('border rounded-xl p-2', 'bg-white')}>
        {message.text}
      </div>
    </div>
  )
}

FeedMessage.fragments = {
  message: (name = 'feedMessage') => gql`
    fragment ${name} on Message {
      id
      text,
      created_at
    }
  `,
}
