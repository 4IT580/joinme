import classNames from 'classnames'

function PlacesOffersCard({ title, address, description, image, className }) {
  return (
    <div className={classNames('card lg:card-side shadow-lg text-sm', className)}>
      <figure className="p-4 flex items-center">
        <img className="rounded-2xl h-36 w-36" src={image} />
      </figure>
      <div className="card-body">
        <p className="pb-2">{description}</p>
        <h2 className="card-title">{title}</h2>
        <p>{address}</p>
      </div>
    </div>
  )
}

export default PlacesOffersCard
