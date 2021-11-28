import * as yup from 'yup'
import { Formik, Form } from 'formik'
import FormControl from '../molecules/FormControl'
import Button from '../atoms/Button'
import MultiInput from '../atoms/MultiInput'

const updateProfileFormSchema = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
  city: yup.string(),
  description: yup.string(),
})

export default function UserProfileForm({ name, city, description, interests, onSubmit, onClose }) {
  return (
    <Formik
      initialValues={{
        name: name || '',
        city: city || '',
        description: description || '',
        interests: interests || [],
      }}
      validationSchema={updateProfileFormSchema}
      onSubmit={(variables) => onSubmit({ ...variables, interests: variables.interests.split(' ') })}
    >
      <Form>
        <FormControl name="name" label="Name" placeholder="Your name" />
        <FormControl name="city" label="City" placeholder="Your city" />
        <FormControl name="description" label="Description" placeholder="Tell everyone about yourself"></FormControl>
        <FormControl Component={MultiInput} name="interests" label="Interests" placeholder="Separate with spaces" />
        <div className="modal-action">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" className="btn-primary">
            Submit
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
