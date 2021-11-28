import classNames from 'classnames'
import Button from '../atoms/Button'

export default function InvitationCard({ eventName, eventDate, inviteFrom, eventVenue, image, className }) {
  return (
    <div className={classNames('card shadow-lg flex bg-white text-sm', className)}>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row">
        <img className="rounded-2xl h-36 w-36 m-4 object-cover" src={image} />
        <div className="flex flex-grow flex-col">
          <p className="flex px-4 pt-4">{eventDate}</p>
          <h2 className="flex font-bold text-xl px-4">{eventName}</h2>
          <p className="flex px-4">{eventVenue}</p>
          <p className="flex px-4">
            Invite from <strong>{inviteFrom}</strong>
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between p-4 gap-4">
        <Button className="btn-primary flex flex-grow">Accept</Button>
        <Button className="flex flex-grow">Decline</Button>
      </div>
    </div>
  )
}
