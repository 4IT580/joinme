import { XIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import image from '../assets/user.jpg'
import InlineInput from '../atoms/InlineInput'
import VerticalLine from '../atoms/VerticalLine'
import Button from '../atoms/Button'
import PasswordChangeForm from './PasswordChangeForm'
import { useAuth } from '../utils/auth'
import { useMutation, gql } from '@apollo/client'
import Alert, { TYPE_ERROR, TYPE_SUCCESS } from '../atoms/Alert'

const UPDATE_PROFILE_MUTATION = gql`
  mutation ($name: String, $city: String, $description: String, $interests: String) {
    updateProfile(name: $name, city: $city, description: $description, interests: $interests) {
      id
    }
  }
`

const SaveProfile = async (user, closeModal, updateProfile, setIsErrorAlertVisible) => {
  const variables = { ...user, interests: JSON.stringify(user.interests) }
  console.log('saveUsar ---', variables)

  try {
    const { data } = await updateProfile({ variables })

    if (data.errors) {
      setIsErrorAlertVisible(true)
    } else {
      setIsErrorAlertVisible(false)

      closeModal()
    }
  } catch (e) {
    setIsErrorAlertVisible(true)
  }
}

const EditTab = ({
  user,
  updateUser,
  closeModal,
  updateProfile,
  setIsErrorAlertVisible,
  setIsInterestsErrorAlertVisible,
}) => {
  const tags = [
    'Concerts',
    'Parties',
    'Games',
    'Sports',
    'Art',
    'Fashion',
    'Movies',
    'Tech',
    'Outdoors',
    'Traveling',
    'Hiking',
    'Volunteer',
    'Cooking',
    'Coffee',
    'Food',
    'Drinks',
  ]

  function handleTagClick(tag, setIsInterestsErrorAlertVisible) {
    console.log(user.interests, tag)
    if (user.interests.includes(tag)) {
      setIsInterestsErrorAlertVisible(false)

      updateUser({
        ...user,
        interests: user.interests.filter((t) => t !== tag),
      })
    } else {
      if (user.interests.length >= 6) {
        setIsInterestsErrorAlertVisible(true)
      } else {
        updateUser({
          ...user,
          interests: [...user.interests, tag],
        })
      }
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className={'flex flex-col w-1/3 items-center'}>
          <img src={image} alt="image" className={'w-24 rounded-full'} />
          <button className={'bg-gray-200 rounded-xl mt-2 font-bold uppercase text-xs p-2'}>change photo</button>
        </div>
        <div className="flex flex-col w-2/3 justify-between">
          <InlineInput value={user.name} onChange={(e) => updateUser({ ...user, name: e })} />
          <InlineInput value={user.username} onChange={(e) => updateUser({ ...user, username: e })} />
          <InlineInput value={user.city} onChange={(e) => updateUser({ ...user, city: e })} />
        </div>
      </div>
      <div className={'h-24'}>
        <textarea
          className="outline-none bordered border-black border-2 mt-4 w-full px-4 pt-2  h-full"
          value={user.description}
          onChange={(e) =>
            updateUser({
              ...user,
              description: e.target.value,
            })
          }
        />
      </div>
      <div className={'mt-8'}>
        <InlineInput value={'Choose up to 6 interests'} onChange={() => {}} />
      </div>
      <div className={'flex flex-row flex-wrap mt-4'}>
        {tags.map((tag, index) => (
          <div key={index} className={'w-1/4 h-10'}>
            <div className={'mx-1'}>
              <button
                className={`border-${
                  user.interests.includes(tag) ? 'red' : 'gray'
                }-900 border-2 rounded-xl font-bold uppercase text-xs p-2 w-full`}
                onClick={() => handleTagClick(tag, setIsInterestsErrorAlertVisible)}
              >
                {tag}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={'flex flex-row justify-between mt-3'}>
        <div className={'w-1/2 pr-2'}>
          <Button className={'bg-gray-200 text-black w-full border-none'} onClick={closeModal}>
            Cancel
          </Button>
        </div>
        <div className={'w-1/2 pl-2'}>
          <Button
            className={'w-full'}
            onClick={() => SaveProfile(user, closeModal, updateProfile, setIsErrorAlertVisible)}
          >
            save changes
          </Button>
        </div>
      </div>
    </div>
  )
}

const SettingsTab = () => {
  return <PasswordChangeForm />
}

export default function AccountModal({ closeModal, loadedUser }) {
  const [activeTab, setActiveTab] = useState('edit')
  const editActive = activeTab === 'edit'
  const [user, setUser] = useState({
    name: loadedUser.name,
    username: loadedUser.username,
    city: loadedUser.city,
    description: loadedUser.description,
    interests: loadedUser.interests,
  })
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)
  const [isInterestsErrorAlertVisible, setIsInterestsErrorAlertVisible] = useState(false)
  const auth = useAuth()
  const [updateProfile, updateProfileState] = useMutation(UPDATE_PROFILE_MUTATION)

  return (
    <div>
      <div className={'bg-white w-1/2 m-auto pt-12 rounded-3xl relative h-full p-6'}>
        {isErrorAlertVisible && <Alert type={TYPE_ERROR}>Profile update failed</Alert>}
        {isInterestsErrorAlertVisible && <Alert type={TYPE_ERROR}>You can only select up to 6 interests</Alert>}
        <div className={'w-96 m-auto'}>
          <div className="flex flex-row justify-between cursor-pointer my-4">
            <span
              className={`font-bold text-2xl ${editActive ? '' : 'text-gray-400'}`}
              onClick={() => setActiveTab('edit')}
            >
              Edit profile
            </span>
            <VerticalLine />
            <span
              className={`font-bold text-2xl ${editActive ? 'text-gray-400' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </span>
          </div>
          {editActive ? (
            <EditTab
              user={user}
              updateUser={(u) => setUser(u)}
              closeModal={closeModal}
              updateProfile={updateProfile}
              setIsErrorAlertVisible={setIsErrorAlertVisible}
              setIsInterestsErrorAlertVisible={setIsInterestsErrorAlertVisible}
            />
          ) : (
            <SettingsTab />
          )}
        </div>

        <div className={'absolute bg-gray-100 w-10 h-10 rounded-xl top-8 right-8 cursor-pointer'} onClick={closeModal}>
          <XIcon />
        </div>
      </div>
    </div>
  )
}
