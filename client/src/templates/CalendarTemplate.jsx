import { useState } from 'react'
import Title from '../atoms/Title'
import EventDetailsCard from '../molecules/EventDetailsCard'
import EventSmallCard from '../molecules/EventSmallCard'
import Chat from '../organisms/Chat'

export default function CalendarTemplate({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4 h-full">
      <div className="flex flex-col bg-gray-200 rounded-2xl p-2 md:w-1/4 lg:w-1/4 flex-grow gap-4">
        <Title>Events</Title>
        {events.map((event) => (
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
