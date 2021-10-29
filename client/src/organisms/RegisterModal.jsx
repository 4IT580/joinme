import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { useMutation, gql } from '@apollo/client'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'

const REGISTER_MUTATION = gql`
  mutation ($handle: String!, $name: String!, $email: String!, $password: String!) {
    register(handle: $handle, name: $name, email: $email, password: $password) {
      user {
        id
        handle
        name
        email
      }
      token
    }
  }
`

const registerModalFormSchema = yup.object().shape({
  handle: yup.string().min(3).max(6).required('Handle is required'),
  name: yup.string().min(3).max(50).required('Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

export default function RegisterModal({ onClose }) {
  const [register, registerState] = useMutation(REGISTER_MUTATION)

  return (
    <Modal>
      <Title className="mb-4">Create NEW account</Title>
      <Formik
        initialValues={{
          handle: '',
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={registerModalFormSchema}
        onSubmit={async (variables) => {
          await register({ variables })

          onClose()
        }}
      >
        <Form>
          <FormControl name="handle" label="Handle" placeholder="Your unique handle" />
          <FormControl name="name" label="Name" placeholder="Name you want other users to see" />
          <FormControl name="email" label="Email" type="email" placeholder="Email we can contact you on" />
          <FormControl name="password" label="Password" type="password" placeholder="Don't tell it to anyone" />
          <FormControl
            name="passwordConfirmation"
            label="Password confirmation"
            type="password"
            placeholder="Repeat password to make sure it is without a typo"
          />

          <div className="modal-action">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" className="btn-primary" loading={registerState.loading}>
              Register
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}
