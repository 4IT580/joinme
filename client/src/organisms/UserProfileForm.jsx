import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { useMutation, gql } from '@apollo/client'
import Button from '../atoms/Button'
import FormControl from '../molecules/FormControl'
import React, { useState } from 'react'
import Alert, { TYPE_ERROR, TYPE_SUCCESS } from '../atoms/Alert'
import { useAuth } from '../utils/auth'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'

const UPDATE_PROFILE_MUTATION = gql`
  mutation ($name: String, $city: String, $description: String, $interests: String) {
    updateProfile(name: $name, city: $city, description: $description, interests: $interests)
  }
`

const updateProfileFormSchema = yup.object().shape({
  name: yup.string().min(3).max(50),
  city: yup.string(),
  description: yup.string(),
})

export default function UpdateProfileForm(name = '', city = '', description = '', interests = '{[]}') {
  const auth = useAuth()
  const [updateProfile, updateProfileState] = useMutation(UPDATE_PROFILE_MUTATION)
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)

  return (
    <div>
      {isInfoAlertVisible && <Alert type={TYPE_INFO}>Password request sent to your email</Alert>}
      {isErrorAlertVisible && <Alert type={TYPE_ERROR}>Password reset request was not successful</Alert>}

      <Formik
        initialValues={{
          name: name,
          city: city,
          description: description,
        }}
        validationSchema={updateProfileFormSchema}
        onSubmit={async (variables) => {
          try {
            const { data } = await updateProfile({ variables })

            if (data.errors) {
              setIsSuccessAlertVisible(false)
              setIsErrorAlertVisible(true)
            } else {
              setIsSuccessAlertVisible(true)
              setIsErrorAlertVisible(false)
            }
          } catch (e) {
            setIsSuccessAlertVisible(false)
            setIsErrorAlertVisible(true)
          }
        }}
      >
        <Form>
          <FormControl name="name" label="Name" placeholder="Your name"></FormControl>
          <FormControl name="city" label="City" placeholder="Your city"></FormControl>
          <FormControl name="description" label="Description" placeholder="Tell everyone about yourself"></FormControl>
        </Form>
      </Formik>
    </div>
  )
}
