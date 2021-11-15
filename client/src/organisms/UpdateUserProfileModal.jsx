import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import { useNotifications } from '../utils/notifications'
import { useUser } from '../utils/user'
import UpdateUserProfileForm from './UpdateUserProfileForm'
import ChangePasswordForm from './ChangePasswordForm'

const UPDATE_PROFILE_MUTATION = gql`
  mutation ($name: String, $city: String, $description: String, $interests: [String!], $photo: String) {
    updateProfile(name: $name, city: $city, description: $description, interests: $interests, photo: $photo) {
      id
    }
  }
`

const UPDATE_PHOTO_MUTATION = gql`
  mutation ($photo: String) {
    updateProfile(photo: $photo) {
      id
    }
  }
`

export default function UpdateUserProfileModal({ profile, onClose }) {
  const user = useUser()
  const notifications = useNotifications()
  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION)
  const [updatePhoto] = useMutation(UPDATE_PHOTO_MUTATION)
  const [isOnProfileTab, setIsOnProfileTab] = useState(true)

  const onSubmit = async (variables, isUser) => {
    try {
      await updateProfile({ variables })
      await user.refetch()
      notifications.pushSuccess({ text: 'Updated' })
      onClose()
    } catch (e) {
      notifications.pushError({ text: e.message })
    }
  }
  const onPictureSubmit = async (variables, isUser) => {
    try {
      await updatePhoto({ variables })
      await user.refetch()
      notifications.pushSuccess({ text: 'Updated' })
      onClose()
    } catch (e) {
      notifications.pushError({ text: e.message })
    }
  }

  return (
    <Modal>
      <div className="flex justify-between">
        {isOnProfileTab ? (
          <>
            <Title level="2" className="mr-2 my-auto">
              Update profile
            </Title>
            <Button className="my-auto" onClick={() => setIsOnProfileTab(false)}>
              Change password
            </Button>
          </>
        ) : (
          <>
            <Button className="my-auto" onClick={() => setIsOnProfileTab(true)}>
              Update profile
            </Button>
            <Title level="2" className="ml-2 my-auto">
              Change password
            </Title>
          </>
        )}
      </div>

      {isOnProfileTab && (
        <UpdateUserProfileForm {...profile} onSubmit={onSubmit} onPictureSubmit={onPictureSubmit} onClose={onClose} />
      )}
      {!isOnProfileTab && <ChangePasswordForm {...profile} onClose={onClose} />}
    </Modal>
  )
}
