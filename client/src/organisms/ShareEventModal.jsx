import { Form, Formik } from 'formik'
import { gql, useMutation } from '@apollo/client'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import MultiInput from '../atoms/MultiInput'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'
import { useNotifications } from '../utils/notifications'

export default function ShareEventModal({ event, onClose }) {
  const notifications = useNotifications()
  const [shareEvent] = useMutation(mutation)

  return (
    <Modal>
      <Title className="mb-4">Share event</Title>

      <Formik
        initialValues={{
          invites: [],
        }}
        onSubmit={async (input) => {
          try {
            const invites = input.invites.split(' ').filter(Boolean)
            await shareEvent({ variables: { eventId: event.id, invites } })
            notifications.pushSuccess({ text: 'Event shared' })
            onClose()
          } catch (e) {
            notifications.pushError({ text: e.message })
          }
        }}
      >
        <Form>
          <FormControl Component={MultiInput} name="invites" label="People you want to invite" />

          <div className="modal-action">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" className="btn-primary">
              Share
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}

const mutation = gql`
  mutation ($eventId: Int!, $invites: [String!]!) {
    shareEvent(eventId: $eventId, invites: $invites)
  }
`
