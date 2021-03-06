import * as yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { Form, Formik } from 'formik'
import { useNotifications } from '../utils/notifications'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'
import MultiInput from '../atoms/MultiInput'
import PlaceInput from '../atoms/PlaceInput'

export default function CreateEventModal({ refetch, onClose }) {
  const notifications = useNotifications()
  const [createEvent, createEventState] = useMutation(mutation)

  return (
    <Modal>
      <Title>Create NEW event</Title>

      <Formik
        initialValues={{
          name: '',
          place: '',
          description: '',
          from: '',
          to: '',
          public: false,
          invites: [],
        }}
        validationSchema={schema}
        onSubmit={async (input) => {
          try {
            await createEvent({
              variables: {
                input: { ...input, place: JSON.stringify(input.place), invites: undefined },
                invites: input.invites,
              },
            })
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
          <FormControl Component={PlaceInput} name="place" label="Place" />
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
  name: yup.string().trim().required('Name is required'),
  from: yup.date().required('Start time is required').min(new Date(), 'Start time cannot be in the past'),
  place: yup.object().typeError('Place has to be selected from the dropdown').required('Place is required'),
  to: yup
    .date()
    .required('End time is required')
    .when('from', (from, yup) => from && yup.min(from, 'End time cannot be before start time')),
})
