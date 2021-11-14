import classNames from 'classnames'

function EventCard({ title, venue, date, image, className }) {
  return (
    <div className={classNames('card shadow-lg text-sm', className)}>
      <figure>
        <img className="rounded-t-2xl h-40" src={image} />
      </figure>
      <div className="card-body">
        <p>{date}</p>
        <h2 className="card-title">{title}</h2>
        <p>{venue}</p>
      </div>
    </div>
  )
}

export default EventCard
