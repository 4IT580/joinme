import { gql, useMutation } from '@apollo/client'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import Button from '../atoms/Button'
import FormControl from './FormControl'

export default function CouponCreation({ event, refetch, onClose }) {
  const [createCoupon] = useMutation(createCouponMutation)

  const onSubmit = async (data) => {
    await createCoupon({ variables: { input: { ...data, eventId: event.id } } })
    await refetch()
    onClose()
  }

  return (
    <Formik initialValues={{ name: '', description: '' }} validationSchema={schema} onSubmit={onSubmit}>
      <Form>
        <FormControl name="name" label="Name" />
        <FormControl name="description" label="Description" />

        <div className="modal-action">
          <Button onClick={onClose}>Close</Button>
          <Button type="submit" className="btn-primary">
            Create
          </Button>
        </div>
      </Form>
    </Formik>
  )
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
})

const createCouponMutation = gql`
  mutation ($input: CouponInput!) {
    createCoupon(input: $input) {
      id
    }
  }
`
