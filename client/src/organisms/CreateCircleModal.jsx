import { gql, useMutation } from '@apollo/client'
import { useNotifications } from '../utils/notifications'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import CircleForm from './CircleForm'

export default function CreateCircleModal({ refetch, onClose }) {
  const notifications = useNotifications()
  const [createCircle, createCircleState] = useMutation(mutation)

  return (
    <Modal>
      <Title>Create NEW circle</Title>

      <CircleForm
        initialValues={{
          name: '',
          description: '',
          colour: '',
          invites: [],
        }}
        onSubmit={async (input) => {
          try {
            await createCircle({ variables: { input: { ...input, invites: undefined }, invites: input.invites } })
            notifications.pushSuccess({ text: 'Circle created' })
            await refetch()
            onClose()
          } catch (e) {
            notifications.pushError({ text: e.message })
          }
        }}
      >
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" className="btn-primary" loading={createCircleState.loading}>
          Create circle
        </Button>
      </CircleForm>
    </Modal>
  )
}

const mutation = gql`
  mutation ($input: CircleInput!, $invites: String!) {
    createCircle(input: $input, invites: $invites) {
      id
    }
  }
`
