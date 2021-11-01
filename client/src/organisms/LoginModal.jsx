import * as yup from 'yup'
import { Formik, Form } from 'formik'
import Link from '../atoms/Link'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'
import { gql, useMutation } from '@apollo/client'

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
  const [login, loginState] = useMutation(LOGIN_MUTATION)

  return (
    <Modal>
      <Title className="mb-4">Log into your account</Title>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginModalFormSchema}
        onSubmit={async (variables) => {
          try {
            const loginResponse = await login({ variables })

            window.localStorage.setItem('JWT', loginResponse.data.login.token)
            window.location.reload()

            window.alert('Logged in')
            onClose()
          } catch (e) {
            alert(e.message)
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
