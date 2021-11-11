import React from 'react'
import AccountDropdown from '../molecules/AccountDropdown'
import Search from '../molecules/Search'
import Sidebar from '../organisms/Sidebar'

export default function DashboardLayout({ children }) {
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
        <div>{children}</div>
      </div>
    </div>
  )
}
