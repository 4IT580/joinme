import DashboardLayout from '../organisms/DashboardLayout'
import Button from '../atoms/Button'
import InvitationCard from '../molecules/InvitationCard'

export default function InboxDashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-5 gap-2 p-4">
        <div className="flex flex-col gap-y-2 col-span-5 md:col-span-1">
          <Button className="flex">Invitations</Button>
          <Button className="flex">Requests</Button>
        </div>
        <div className="col-span-5 md:col-span-4 bg-gray-100 rounded-2xl p-4">
          <h1 className="text-xl font-bold mb-4">October, 2021</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            <InvitationCard
              eventName="COMIC-CON PRAGUE 2021"
              eventVenue="O2 universum"
              eventDate="17.10 from 10am till 11pm"
              inviteFrom="Jane"
              image="https://picsum.photos/id/1005/400/250"
            />
            <InvitationCard
              eventName="COMIC-CON PRAGUE 2021"
              eventVenue="O2 universum"
              eventDate="17.10 from 10am till 11pm"
              inviteFrom="Jane"
              image="https://picsum.photos/id/1005/400/250"
            />
            <InvitationCard
              eventName="COMIC-CON PRAGUE 2021"
              eventVenue="O2 universum"
              eventDate="17.10 from 10am till 11pm"
              inviteFrom="Jane"
              image="https://picsum.photos/id/1005/400/250"
            />
            <InvitationCard
              eventName="COMIC-CON PRAGUE 2021"
              eventVenue="O2 universum"
              eventDate="17.10 from 10am till 11pm"
              inviteFrom="Jane"
              image="https://picsum.photos/id/1005/400/250"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
