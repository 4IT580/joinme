import * as yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { Form, Formik } from 'formik'
import { useNotifications } from '../utils/notifications'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'

export default function UpdateEventModal({ event, refetch, onClose }) {
  const notifications = useNotifications()
  const [updateEvent, updateEventState] = useMutation(mutation)

  return (
    <Modal>
      <Title>Update "{event.name}" event</Title>

      <Formik
        initialValues={{
          name: event.name,
          place: event.place,
          description: event.description,
          from: new Date(event.from).toISOString().replace(/:\d+\.\d+Z$/, ''),
          to: new Date(event.to).toISOString().replace(/:\d+\.\d+Z$/, ''),
          public: event.public,
        }}
        validationSchema={schema}
        onSubmit={async (input) => {
          try {
            await updateEvent({ variables: { eventId: event.id, input } })
            notifications.pushSuccess({ text: 'Event uupdated' })
            await refetch()
            onClose()
          } catch (e) {
            notifications.pushError({ text: e.message })
          }
        }}
      >
        <Form>
          <FormControl name="name" label="Name" />
          <FormControl name="place" label="Place" />
          <FormControl Component="textarea" className="textarea h-28" name="description" label="Description" />
          <div className="grid grid-cols-2 gap-4">
            <FormControl type="datetime-local" name="from" label="From" />
            <FormControl type="datetime-local" name="to" label="To" />
          </div>
          <FormControl type="checkbox" name="public" label="Is event public?" />

          <div className="modal-action">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" className="btn-primary" loading={updateEventState.loading}>
              Update event
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}

const mutation = gql`
  mutation ($eventId: Int!, $input: EventInput!) {
    updateEvent(eventId: $eventId, input: $input) {
      id
    }
  }
`

const schema = yup.object({
  name: yup.string().required('Name is required'),
  from: yup.string().required('From is required'),
  to: yup.string().required('To is required'),
})
