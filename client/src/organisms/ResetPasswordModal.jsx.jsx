import * as yup from 'yup'
import { Formik, Form } from 'formik'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import FormControl from '../molecules/FormControl'
import { gql, useMutation } from '@apollo/client'
import { useRouteQuery } from '../Hooks'

const RESET_PASSWORD_MUTATION = gql`
  mutation ($secret: String!, $password: String!) {
    resetPassword(secret: $secret, password: $password)
  }
`

const resetPasswordModalFormSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

export default function ResetPasswordModal({ onClose }) {
  const { secret } = useRouteQuery()
  const [resetPassword, resetPasswordState] = useMutation(RESET_PASSWORD_MUTATION)

  return (
    <Modal>
      <Title className="mb-4">Reset your password</Title>
      <Formik
        initialValues={{
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={resetPasswordModalFormSchema}
        onSubmit={async ({ password }) => {
          try {
            await resetPassword({
              variables: {
                secret,
                password,
              },
            })
            alert('Password changed')
            onClose()
          } catch (e) {
            alert(e.message)
          }
        }}
      >
        <Form>
          <FormControl name="password" label="Password" type="password" placeholder="Don't tell it to anyone" />
          <FormControl
            name="passwordConfirmation"
            label="Password confirmation"
            type="password"
            placeholder="Repeat password to make sure it is without a typo"
          />

          <div className="modal-action">
            <Button type="submit" className="btn-primary" loading={resetPasswordState.loading}>
              Reset password
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}
