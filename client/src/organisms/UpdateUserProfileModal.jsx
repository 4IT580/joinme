import { useMutation, gql } from '@apollo/client'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import { useNotifications } from '../utils/notifications'
import { useUser } from '../utils/user'
import UserProfileForm from './UserProfileForm'

const UPDATE_PROFILE_MUTATION = gql`
  mutation ($name: String, $city: String, $description: String, $interests: [String!]) {
    updateProfile(name: $name, city: $city, description: $description, interests: $interests) {
      id
    }
  }
`

export default function UpdateUserProfileModal({ profile, onClose }) {
  const user = useUser()
  const notifications = useNotifications()
  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION)

  const onSubmit = async (variables) => {
    try {
      await updateProfile({ variables })
      await user.refetch()
      notifications.pushSuccess({ text: 'Updated' })
      onClose()
    } catch (e) {
      notifications.pushError({ text: e.message })
    }
  }

  return (
    <Modal>
      <Title className="mb-4">Update user profile</Title>
      <UserProfileForm {...profile} onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  )
}
