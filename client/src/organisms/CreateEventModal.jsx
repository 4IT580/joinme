import * as yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { Form, Formik } from 'formik'
import { useNotifications } from '../utils/notifications'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'
import MultiInput from '../atoms/MultiInput'

export default function CreateEventModal({ refetch, onClose }) {
  const notifications = useNotifications()
  const [createEvent, createEventState] = useMutation(mutation)

  return (
    <Modal>
      <Title>Create NEW event</Title>

      <Formik
        initialValues={{
          name: '',
          description: '',
          from: '',
          to: '',
          public: false,
          invites: [],
        }}
        validationSchema={schema}
        onSubmit={async (input) => {
          try {
            await createEvent({ variables: { input: { ...input, invites: undefined }, invites: input.invites } })
            notifications.pushSuccess({ text: 'Event created' })
            await refetch()
            onClose()
          } catch (e) {
            notifications.pushError({ text: e.message })
          }
        }}
      >
        <Form>
          <FormControl name="name" label="Name" />
          <FormControl Component="textarea" className="textarea h-28" name="description" label="Description" />
          <div className="grid grid-cols-2 gap-4">
            <FormControl type="datetime-local" name="from" label="From" />
            <FormControl type="datetime-local" name="to" label="To" />
          </div>
          <FormControl type="checkbox" name="public" label="Is event public?" />
          <FormControl Component={MultiInput} name="invites" label="People you want to invite" />

          <div className="modal-action">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" className="btn-primary" loading={createEventState.loading}>
              Create event
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}

const mutation = gql`
  mutation ($input: EventInput!, $invites: String) {
    createEvent(input: $input, invites: $invites) {
      id
    }
  }
`

const schema = yup.object({
  name: yup.string().required('Name is required'),
  from: yup.string().required('From is required'),
  to: yup.string().required('To is required'),
})
