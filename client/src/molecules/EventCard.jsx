import classNames from 'classnames'
import { Link } from 'react-router-dom'

export default function EventCard({ event, className }) {
  const from = new Date(event.from).toLocaleString()
  const to = new Date(event.to).toLocaleString()

  return (
    <Link to={`/event/${event.id}`}>
      <div className={classNames('card shadow-lg text-sm', className)}>
        <figure>
          <img className="rounded-t-2xl h-40 object-cover" src={`https://picsum.photos/400/250?id${event.id}`} />
        </figure>
        <div className="card-body">
          <p>
            From: {from}
            <br />
            Till: {to}
          </p>
          <h2 className="card-title mt-1.5 mb-1.5">{event.name}</h2>
          <p className="">{event.place}</p>
        </div>
      </div>
    </Link>
  )
}
