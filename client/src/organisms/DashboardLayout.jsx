import { useState } from 'react'
import classNames from 'classnames'
import AccountDropdown from '../molecules/AccountDropdown'
import Search from '../molecules/Search'
import Sidebar from '../organisms/Sidebar'
import icon from '../assets/tabicon32x32.png'
import { UserProvider } from '../utils/user'

export default function DashboardLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggle = (e) => {
    e.preventDefault()

    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <UserProvider>
      <div className="flex flex-col h-screen">
        <div className="flex p-1 border-b">
          <a href="/" onClick={toggle} className="flex md:hidden text-white font-extrabold text-3xl">
            <img src={icon} className="h-16" />
          </a>
          <a href="/" className="hidden md:flex text-white font-extrabold text-3xl">
            <img src={icon} className="h-16" />
          </a>
          <div className="flex flex-grow justify-end md:justify-between ml-4 my-auto">
            <Search />
            <AccountDropdown />
          </div>
        </div>

        <div className="flex flex-row flex-grow overflow-y-hidden">
          <div className={classNames('md:flex p-1 z-50 m-1', isMenuOpen ? 'fixed' : 'hidden')}>
            <Sidebar />
          </div>
          <div className="flex-grow overflow-y-scroll">{children}</div>
        </div>
      </div>
    </UserProvider>
  )
}
