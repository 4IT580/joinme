import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { useMutation, gql } from '@apollo/client'
import Button from '../atoms/Button'
import FormControl from '../molecules/FormControl'
import React, { useState } from 'react'
import Alert, { TYPE_ERROR, TYPE_SUCCESS } from '../atoms/Alert'
import { useAuth } from '../utils/auth'

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

export default function PasswordChangeForm() {
  const auth = useAuth()
  const [changePassword, changePasswordState] = useMutation(CHANGE_PASSWORD_MUTATION)
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)

  return (
    <div>
      {isSuccessAlertVisible && <Alert type={TYPE_SUCCESS}>Password change successful</Alert>}
      {isErrorAlertVisible && <Alert type={TYPE_ERROR}>Password change was not successful</Alert>}

      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          passwordConfirmation: '',
        }}
        validationSchema={changePasswordFormSchema}
        onSubmit={async (variables) => {
          try {
            const { data } = await changePassword({ variables })

            if (data) {
              setIsSuccessAlertVisible(true)
              setIsErrorAlertVisible(false)
            } else {
              setIsSuccessAlertVisible(false)
              setIsErrorAlertVisible(true)
            }
          } catch (e) {
            setIsSuccessAlertVisible(false)
            setIsErrorAlertVisible(true)
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
            <Button type="submit" className="btn-primary" loading={changePasswordState.loading}>
              Change password
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
