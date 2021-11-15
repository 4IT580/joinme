import { useState } from 'react'
import { CogIcon } from '@heroicons/react/solid'
import image from '../assets/user.jpg'
import UpdateUserProfileModal from './UpdateUserProfileModal'
import { useUser } from '../utils/user'

export default function AccountInfo() {
  const { profile } = useUser()
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false)

  return (
    <div className="rounded-3xl relative flex flex-col justify-center shadow-md bg-white p-6 py-4 mt-4 w-96">
      <div className="flex flex-col justify-center items-center">
        <img src={image} alt="user" className="w-44 rounded-full" />
        <span className="text-xl font-bold">Name</span> <span className="text-lg">{profile.name}</span>
        <span className="text-lg text-gray-500">{profile.city}</span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-bold uppercase text-sm">About {profile.name}</span>
        <span className="pl-6 pt-2">{profile.description}</span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-bold uppercase text-sm">Interests</span>
        <div className="flex flex-row flex-wrap mt-2">
          {profile.interests.map((tag, index) => (
            <div key={index} className="w-1/3 h-10">
              <div className="mx-1">
                <button className={`border-2 rounded-xl uppercase text-xs p-2 py-1 w-full}`}>{tag}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow" />
      <div className="text-center m-0">
        <button className="px-20 py-2 bg-primary text-white rounded-xl uppercase font-bold">Create event</button>
      </div>

      <div
        className="absolute bg-gray-100 w-12 h-12 rounded-xl top-4 left-4 cursor-pointer"
        onClick={() => setIsUpdateUserModalOpen(true)}
      >
        <CogIcon />
      </div>

      {isUpdateUserModalOpen && (
        <UpdateUserProfileModal profile={profile} onClose={() => setIsUpdateUserModalOpen(false)} />
      )}
    </div>
  )
}
