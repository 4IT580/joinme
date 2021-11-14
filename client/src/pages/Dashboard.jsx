import Sidebar from '../organisms/Sidebar'
import Header from '../organisms/Header'

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="p-1">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow">
        <Header />
      </div>
    </div>
  )
}
