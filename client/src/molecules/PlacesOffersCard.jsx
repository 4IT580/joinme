import classNames from 'classnames'

export default function PlacesOffersCard({ title, address, description, image, className }) {
  return (
    <div className={classNames('card shadow-lg flex', className)}>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row">
        <img className="rounded-2xl h-36 w-36 m-4 object-cover" src={image} />
        <p className="p-4">{description}</p>
      </div>
      <div className="p-4">
        <h2 className="card-title">{title}</h2>
        <p>{address}</p>
      </div>
    </div>
  )
}
