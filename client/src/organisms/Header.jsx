import NotificationGreeting from '../molecules/NotificationGreeting'
import Search from '../molecules/Search'

export default function () {
    return ( <div className="flex justify-between p-1">
    <Search />
    <NotificationGreeting />
  </div>)

}