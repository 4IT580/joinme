import { useState } from 'react'
import { CogIcon } from '@heroicons/react/solid'
import image from '../assets/user.jpg'
import UpdateUserProfileModal from './UpdateUserProfileModal'
import { useUser } from '../utils/user'
import { gql, useMutation } from '@apollo/client'

const IMAGE_UPLOAD_QUERY = gql`
  mutation ($file: Upload!) {
    userImageUpload(file: $file)
  }
`

export default function AccountInfo() {
  const { profile } = useUser()
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false)
  const [uploadImageMutation] = useMutation(IMAGE_UPLOAD_QUERY)

  const onPictureSelected = async ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      const newLink = await uploadImageMutation({ variables: { file } })

      const image = document.getElementById('profile-image')
      image.src = newLink.data.userImageUpload
    }
  }

  const onPictureClick = () => {
    const input = document.getElementById('profile-image-upload')
    input.click()
  }

  return (
    <div className="flex">
      <div className="rounded-3xl relative flex flex-col justify-center shadow-md bg-white p-6 py-4 mt-4 max-w-md">
        <div className="flex flex-col justify-center items-center">
          <input
            id="profile-image-upload"
            onChange={onPictureSelected}
            className="hidden"
            type="file"
            accept=".jpg,.gif,.svg,.png"
          />
          <img
            onClick={onPictureClick}
            id="profile-image"
            src={profile.photo ? profile.photo : image}
            alt="user"
            className="w-44 rounded-full"
          />
          <span className="text-xl font-bold">Name</span> <span className="text-lg">{profile.name}</span>
          <span className="text-lg text-gray-500">{profile.city}</span>
        </div>
        <div className="flex flex-col mt-6">
          <span className="font-bold uppercase text-sm">About {profile.name}</span>
          <span className="pt-2">{profile.description}</span>
        </div>
        <div className="flex flex-col mt-6">
          <span className="font-bold uppercase text-sm">Interests</span>
          <div className="flex flex-row flex-wrap gap-2 mt-2">
            {profile.interests.filter(Boolean).map((tag, index) => (
              <span key={index} className="border-2 rounded-xl uppercase text-xs p-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-grow" />
        <div className="text-center mt-2">
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
    </div>
  )
}
