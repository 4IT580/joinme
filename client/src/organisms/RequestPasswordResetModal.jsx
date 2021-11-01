import * as yup from 'yup'
import { Formik, Form } from 'formik'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'
import { gql, useMutation } from '@apollo/client'
import Alert, { TYPE_INFO, TYPE_ERROR } from '../atoms/Alert'
import { useState } from 'react'

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation ($email: String!) {
    requestPasswordReset(email: $email)
  }
`

const requestPasswordResetModalFormSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email').required('Email is required'),
})

export default function RequestPasswordResetModal({ onClose }) {
  const [requestPasswordReset, requestPasswordResetState] = useMutation(REQUEST_PASSWORD_RESET_MUTATION)
  const [isInfoAlertVisible, setIsInfoAlertVisible] = useState(false)
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)

  return (
    <Modal>
      <Title className="mb-4">Reset your password</Title>
      {isInfoAlertVisible && <Alert type={TYPE_INFO}>Password request sent to your email</Alert>}
      {isErrorAlertVisible && <Alert type={TYPE_ERROR}>Password reset request was not successful</Alert>}

      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={requestPasswordResetModalFormSchema}
        onSubmit={async (variables) => {
          try {
            await requestPasswordReset({ variables })
            if (isErrorAlertVisible) {
              setIsErrorAlertVisible(false)
            }
            setIsInfoAlertVisible(true)
          } catch (e) {
            if (isInfoAlertVisible) {
              setIsInfoAlertVisible(false)
            }
            setIsErrorAlertVisible(true)
          }
        }}
      >
        <Form>
          <FormControl name="email" label="Email" type="email" placeholder="Enter your email" />

          <div className="modal-action">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" className="btn-primary" loading={requestPasswordResetState.loading}>
              Reset password
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}
