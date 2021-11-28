import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { gql, useMutation } from '@apollo/client'
import FormControl from '../molecules/FormControl'
import Button from '../atoms/Button'
import { useNotifications } from '../utils/notifications'

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`

const changePasswordFormSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\-@#\$%\^&\*])(?=.{8,})/,
      'Password must contain at least 8 characters, a lowercase letter, an uppercase letter, a number and a special character',
    )
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
})

export default function UpdateUserProfileForm({ onClose }) {
  const notifications = useNotifications()
  const [changePassword, changePasswordState] = useMutation(CHANGE_PASSWORD_MUTATION)

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        passwordConfirmation: '',
      }}
      validationSchema={changePasswordFormSchema}
      onSubmit={async (variables) => {
        try {
          const { data, errors } = await changePassword({ variables })

          if (data) {
            notifications.pushSuccess({ text: 'Password change successfully' })
            onClose()
          } else {
            for (const error of errors) {
              notifications.pushError({ text: error.message })
            }
          }
        } catch (e) {
          notifications.pushError({ text: e.message })
        }
      }}
    >
      <Form>
        <FormControl name="oldPassword" label="Old password" type="password" placeholder="Old password" />
        <FormControl name="newPassword" label="New password" type="password" placeholder="Don't tell it to anyone" />
        <FormControl
          name="passwordConfirmation"
          label="New password confirmation"
          type="password"
          placeholder="Repeat password to make sure it is without a typo"
        />

        <div className="modal-action">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" className="btn-primary" loading={changePasswordState.loading}>
            Change password
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
