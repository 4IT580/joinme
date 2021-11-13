import classNames from 'classnames'

function PlacesOffersCard({ title, address, description, image, className }) {
  return (
    <div className={classNames('card lg:card-side shadow-lg text-sm', className)}>
      <figure className="p-4">
        <img className="rounded-full h-36 w-36" src={image} />
      </figure>
      <div className="card-body">
        <p>{description}</p>
        <h2 className="card-title">
          {title}
          {/*<div className="badge mx-2">NEW</div>*/}
        </h2>
        <p>{address}</p>
        {/*  <div className="card-actions">
      <button className="btn btn-primary">Get Started</button>
      <button className="btn btn-ghost">More info</button>
    </div>*/}
      </div>
    </div>
  )
}

export default PlacesOffersCard
