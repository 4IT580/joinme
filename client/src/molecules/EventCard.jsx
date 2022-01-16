import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { parsePlace } from '../Utils'

const intl = new Intl.DateTimeFormat('cs-CZ', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export default function EventCard({ event, className }) {
  const place = parsePlace(event.place)
  const from = intl.format(new Date(event.from))
  const to = intl.format(new Date(event.to))

  return (
    <Link to={`/event/${event.id}`}>
      <div className={classNames('card shadow-lg text-sm', className)}>
        <figure>
          <img
            className="rounded-t-2xl h-40 object-cover"
            src={event.file?.path ? event.file.path : `https://picsum.photos/600/450?id${event.id}`}
          />
        </figure>
        <div className="card-body">
          <p>
            From: {from}
            <br />
            Till: {to}
          </p>
          <h2 className="card-title mt-1.5 mb-1.5">{event.name}</h2>
          <p className="">{place.name}</p>
        </div>
      </div>
    </Link>
  )
}
