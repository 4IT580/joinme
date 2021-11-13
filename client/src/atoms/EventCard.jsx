import classNames from 'classnames'

function EventCard({ title, venue, date, image, className }) {
  return (
    <div className={classNames('card shadow-lg text-sm', className)}>
      <figure>
        <img className="rounded-t-2xl" src={image}></img>
      </figure>
      <div className="card-body">
        <p>{date}</p>
        <h2 className="card-title">
          {title}
          {/*<div className="badge mx-2 badge-secondary">NEW</div>*/}
        </h2>
        <p>{venue}</p>
        {/*    <div className="justify-end card-actions">
          {children}
        </div>*/}
      </div>
    </div>
  )
}

export default EventCard
