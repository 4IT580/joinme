import { useState } from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { gql, useMutation } from '@apollo/client'
import { useAuth } from '../utils/auth'
import Link from '../atoms/Link'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'
import Alert, { TYPE_SUCCESS, TYPE_ERROR } from '../atoms/Alert'

const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        username
        name
        email
      }
      token
    }
  }
`

const loginModalFormSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function LoginModal({ onClose, onRequestPasswordReset }) {
  const auth = useAuth()
  const [login, loginState] = useMutation(LOGIN_MUTATION)
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)

  return (
    <Modal>
      <Title className="mb-4">Log into your account</Title>
      {isSuccessAlertVisible && <Alert type={TYPE_SUCCESS}>Logged in</Alert>}
      {isErrorAlertVisible && <Alert type={TYPE_ERROR}>Wrong email or password</Alert>}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginModalFormSchema}
        onSubmit={async (variables) => {
          try {
            const { data } = await login({ variables })

            auth.signin(data.login)
          } catch (e) {
            setIsSuccessAlertVisible(false)
            setIsErrorAlertVisible(true)
          }
        }}
      >
        <Form>
          <FormControl name="email" label="Email" type="email" placeholder="Enter your email" />
          <FormControl name="password" label="Password" type="password" placeholder="Enter your password" />

          <div className="modal-action">
            <Link className="self-center mr-auto" onClick={onRequestPasswordReset}>
              Reset password
            </Link>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" className="btn-primary" loading={loginState.loading}>
              Log in
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}
