import React from 'react'
import AccountDropdown from '../molecules/AccountDropdown'
import Search from '../molecules/Search'
import Sidebar from '../organisms/Sidebar'
import icon from '../assets/tabicon32x32.png'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-1 border-b">
        <a href="/" className="text-white font-extrabold text-3xl">
          <img src={icon} className="h-16" />
        </a>
        <div className="flex flex-grow justify-end md:justify-between ml-4 my-auto">
          <Search />
          <AccountDropdown />
        </div>
      </div>

      <div className="flex flex-row flex-grow overflow-y-hidden">
        <div className="p-1">
          <Sidebar />
        </div>
        <div className="flex-grow overflow-y-scroll">{children}</div>
      </div>
    </div>
  )
}
