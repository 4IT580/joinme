import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { useMutation, gql } from '@apollo/client'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'
import Alert, { TYPE_ERROR, TYPE_SUCCESS } from '../atoms/Alert'
import { useState } from 'react'

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
  handle: yup.string().min(3).max(20).required('Handle is required'),
  name: yup.string().min(3).max(50).required('Name is required'),
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\-@#\$%\^&\*])(?=.{8,})/,
      'Password must contain at least 8 characters, a lowercase letter, an uppercase letter, a number and a special character',
    )
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

export default function RegisterModal({ onClose }) {
  const [register, registerState] = useMutation(REGISTER_MUTATION)
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)

  return (
    <Modal>
      <Title className="mb-4">Create NEW account</Title>
      {isSuccessAlertVisible && <Alert type={TYPE_SUCCESS}>Registration successful</Alert>}
      {isErrorAlertVisible && <Alert type={TYPE_ERROR}>Registration was not successful</Alert>}

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
          try {
            await register({ variables })
            if (isErrorAlertVisible) {
              setIsErrorAlertVisible(false)
            }
            setIsSuccessAlertVisible(true)
          } catch (e) {
            if (isSuccessAlertVisible) {
              setIsSuccessAlertVisible(false)
            }
            setIsErrorAlertVisible(true)
          }
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
