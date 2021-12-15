import { gql, useMutation } from '@apollo/client'
import { useNotifications } from '../utils/notifications'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import CircleForm from './CircleForm'

export default function EditCircleModal({ circle, refetch, onClose }) {
  const notifications = useNotifications()
  const [editCircle, editCircleState] = useMutation(mutation)

  return (
    <Modal>
      <Title>Edit {circle.name}</Title>

      <CircleForm
        initialValues={{
          name: circle.name,
          description: circle.description,
          colour: circle.colour,
        }}
        onSubmit={async (input) => {
          try {
            await editCircle({ variables: { circleId: circle.id, input } })
            notifications.pushSuccess({ text: 'Circle updated' })
            await refetch()
            onClose()
          } catch (e) {
            notifications.pushError({ text: e.message })
          }
        }}
      >
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" className="btn-primary" loading={editCircleState.loading}>
          Update circle
        </Button>
      </CircleForm>
    </Modal>
  )
}

const mutation = gql`
  mutation ($circleId: Int!, $input: CircleInput!) {
    editCircle(circleId: $circleId, input: $input) {
      id
    }
  }
`
