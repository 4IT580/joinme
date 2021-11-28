import * as yup from 'yup'
import { Form, Formik } from 'formik'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import MultiInput from '../atoms/MultiInput'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'
import { useNotifications } from '../utils/notifications'

export default function ShareEventModal({ event, onClose }) {
  const notifications = useNotifications()

  return (
    <Modal>
      <Title className="mb-4">Share event</Title>

      <Formik
        initialValues={{
          invites: [],
        }}
        validationSchema={schema}
        onSubmit={async (input) => {
          try {
            notifications.pushSuccess({ text: 'Event shared' })
            await refetch()
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

const schema = yup.object({})
