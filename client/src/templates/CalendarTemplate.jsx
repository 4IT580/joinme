import { useState } from 'react'
import Title from '../atoms/Title'
import Button from '../atoms/Button'
import EventDetailsCard from '../molecules/EventDetailsCard'
import EventSmallCard from '../molecules/EventSmallCard'
import Chat from '../organisms/Chat'
import classNames from 'classnames'

export default function CalendarTemplate({ attending, organizing }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [type, setType] = useState('attending')

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4 h-full">
      <div className="flex flex-col bg-gray-200 rounded-2xl p-2 md:w-1/4 lg:w-1/4 flex-grow gap-4">
        <Title>Events</Title>
        <div className="flex gap-2">
          <Button
            className={classNames('flex-grow', { 'btn-primary': type === 'attending' })}
            onClick={() => {
              setType('attending')
              setSelectedEvent(null)
            }}
          >
            Attending
          </Button>
          <Button
            className={classNames('flex-grow', { 'btn-primary': type === 'organizing' })}
            onClick={() => {
              setType('organizing')
              setSelectedEvent(null)
            }}
          >
            Organizing
          </Button>
        </div>
        {(type === 'attending' ? attending : organizing).map((event) => (
          <EventSmallCard
            key={event.id}
            event={event}
            isSelected={event === selectedEvent}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>
      <div className="flex flex-col bg-gray-200 rounded-2xl p-2 md:w-3/4 lg:w-2/4 overflow-y-auto">
        <Title>Chat</Title>
        {selectedEvent && <Chat event={selectedEvent} />}
      </div>
      <div className="flex md:hidden lg:flex flex-col bg-gray-200 rounded-2xl p-2 lg:w-1/4">
        <Title>Details</Title>
        {selectedEvent && <EventDetailsCard event={selectedEvent} />}
      </div>
    </div>
  )
}
