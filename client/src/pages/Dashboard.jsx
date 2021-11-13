import AccountDropdown from '../molecules/AccountDropdown'
import Search from '../molecules/Search'
import Sidebar from '../organisms/Sidebar'
import Button from '../atoms/Button'
import EventCard from '../atoms/EventCard'
import PlacesOffersCard from '../atoms/PlacesOffersCard'

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="p-1">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between p-1">
          <Search />
          <AccountDropdown />
        </div>
        <div className="grid grid-cols-5 gap-2 p-1">
          <div className="flex flex-col col-span-3 p-2">
            <div className="flex flex-row items-center justify-between mb-4">
              <h1 className="px-4 text-2xl font-extrabold">Events in your area</h1>
              <Button className="btn-primary uppercase">Create event</Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <EventCard
                title="COMIC-CON PRAGUE 2021"
                venue="O2 universum"
                date="17.10 from 10am till 11pm"
                image="https://picsum.photos/id/1005/400/250"
              />
              <EventCard
                title="COMIC-CON PRAGUE 2021"
                venue="O2 universum"
                date="17.10 from 10am till 11pm"
                image="https://picsum.photos/id/1005/400/250"
              />
              <EventCard
                title="COMIC-CON PRAGUE 2021"
                venue="O2 universum"
                date="17.10 from 10am till 11pm"
                image="https://picsum.photos/id/1005/400/250"
              />
              <EventCard
                title="COMIC-CON PRAGUE 2021"
                venue="O2 universum"
                date="17.10 from 10am till 11pm"
                image="https://picsum.photos/id/1005/400/250"
              />
              <EventCard
                title="COMIC-CON PRAGUE 2021"
                venue="O2 universum"
                date="17.10 from 10am till 11pm"
                image="https://picsum.photos/id/1005/400/250"
              />
              <EventCard
                title="COMIC-CON PRAGUE 2021"
                venue="O2 universum"
                date="17.10 from 10am till 11pm"
                image="https://picsum.photos/id/1005/400/250"
              />
              <EventCard
                title="COMIC-CON PRAGUE 2021"
                venue="O2 universum"
                date="17.10 from 10am till 11pm"
                image="https://picsum.photos/id/1005/400/250"
              />
            </div>
          </div>
          <div className="flex flex-col col-span-2 p-2">
            <div className="flex flex-row items-center mb-4">
              <h1 className="px-4 text-2xl font-extrabold">Places & Offers</h1>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <PlacesOffersCard
                title="COFFEE CORNER BAKERY"
                address="Korunní 96, Vinohrady"
                description="Ecology is the future - we must look after our planet but at the same time can enjoy great coffee, prepared simply and elegantly in a capsule coffee machine."
                image="https://picsum.photos/id/1005/400/250"
              />
              <PlacesOffersCard
                title="COFFEE CORNER BAKERY"
                address="Korunní 96, Vinohrady"
                description="Ecology is the future - we must look after our planet but at the same time can enjoy great coffee, prepared simply and elegantly in a capsule coffee machine."
                image="https://picsum.photos/id/1005/400/250"
              />
              <PlacesOffersCard
                title="COFFEE CORNER BAKERY"
                address="Korunní 96, Vinohrady"
                description="Ecology is the future - we must look after our planet but at the same time can enjoy great coffee, prepared simply and elegantly in a capsule coffee machine."
                image="https://picsum.photos/id/1005/400/250"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
