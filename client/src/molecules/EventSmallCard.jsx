import classNames from 'classnames'
import Title from '../atoms/Title'

export default function EventSmallCard({ event, isSelected, onClick }) {
  return (
    <div
      className={classNames('bg-white border rounded-lg p-2', isSelected ? 'border-black' : 'border-transparent')}
      onClick={onClick}
    >
      <Title level={2}>{event.name}</Title>
    </div>
  )
}
