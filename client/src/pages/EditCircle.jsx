import Button from '../atoms/Button'
import DashboardLayout from '../organisms/DashboardLayout'
import Input from '../atoms/Input'
import InlineInput from '../atoms/InlineInput'
import { XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

export default function EditCircle() {
  return (
    <DashboardLayout>
      <div className="bg-gray-100 rounded-2xl p-4 m-4">
        <div className="flex flex-row justify-start items-center">
          <Link to="/" className="block p-2">
            <XIcon className="rounded-md bg-gray-700 text-white hover:bg-gray-500 p-2 w-11" />
          </Link>
          <h1 className="text-xl font-bold">Edit circle</h1>
        </div>
        <div className="bg-white rounded-2xl grid grid-cols-2 gap-2 p-4">
          <div className="flex flex-col col-span-2 lg:col-span-1 gap-y-4 justify-between">
            <img src="https://picsum.photos/id/1005/400/250" alt="user" className="w-44 rounded-full" />
            <InlineInput placeholder="Circle name" />
            <InlineInput placeholder="Description" />
            <Button className="flex">Save changes</Button>
          </div>
          <div className="flex flex-col col-span-2 lg:col-span-1 gap-2 bg-gray-100 rounded-2xl p-2">
            <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-2 rounded-2xl">
              <Input placeholder="Search people..." className="flex flex-grow" />
              <Button className="flex">Add</Button>
            </div>
            <div className="flex flex-row rounded-2xl">
              <ul tabIndex="0" className="flex flex-grow menu max-h-80 hover:overflow-y-auto bg-gray-100 rounded-box">
                <li className="flex flex-col sm:flex-row justify-between items-center bg-white my-1 p-2 rounded-xl">
                  <div className="grid grid-cols-2 gap-2 sm:gap-8 justify-between items-center">
                    <img
                      src="https://picsum.photos/id/1005/400/250"
                      alt="user"
                      className="w-24 rounded-full col-span-2 sm:col-span-1"
                    />
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <p className="font-bold">Jane</p>
                      <p>janesusername</p>
                    </div>
                  </div>
                  <Button>Remove from circle</Button>
                </li>
                <li className="flex flex-col sm:flex-row justify-between items-center bg-white my-1 p-2 rounded-xl">
                  <div className="grid grid-cols-2 gap-2 sm:gap-8 justify-between items-center">
                    <img
                      src="https://picsum.photos/id/1005/400/250"
                      alt="user"
                      className="w-24 rounded-full col-span-2 sm:col-span-1"
                    />
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <p className="font-bold">Jane</p>
                      <p>janesusername</p>
                    </div>
                  </div>
                  <Button>Remove from circle</Button>
                </li>
                <li className="flex flex-col sm:flex-row justify-between items-center bg-white my-1 p-2 rounded-xl">
                  <div className="grid grid-cols-2 gap-2 sm:gap-8 justify-between items-center">
                    <img
                      src="https://picsum.photos/id/1005/400/250"
                      alt="user"
                      className="w-24 rounded-full col-span-2 sm:col-span-1"
                    />
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                      <p className="font-bold">Jane</p>
                      <p>janesusername</p>
                    </div>
                  </div>
                  <Button>Remove from circle</Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
