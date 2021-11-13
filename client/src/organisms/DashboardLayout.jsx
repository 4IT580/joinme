import React from 'react'
import AccountDropdown from '../molecules/AccountDropdown'
import Search from '../molecules/Search'
import Sidebar from '../organisms/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen p-6 bg-gray-100">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow p-4 py-0 h-full">
        <div className="flex justify-between ">
          <Search />
          <AccountDropdown />
        </div>
        {children}
      </div>
    </div>
  )
}
