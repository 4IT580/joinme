import classNames from 'classnames'
import Title from '../atoms/Title'

export default function EventSmallCard({ event, isSelected, onClick }) {
  return (
    <div
      className={classNames(
        'flex bg-white border rounded-lg p-2 cursor-pointer',
        isSelected ? 'border-black' : 'border-transparent',
      )}
      onClick={onClick}
    >
      <img src={event.file.path} className="w-24 h-24 mr-2 object-cover" />
      <div>
        <Title level={2}>{event.name}</Title>
        <div>
          {new Date(event.from).toLocaleDateString()} at {event.place}
        </div>
        <div>Organizer: {event.user.name}</div>
      </div>
    </div>
  )
}
