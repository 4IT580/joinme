import * as yup from 'yup'
import { Formik, Form } from 'formik'
import FormControl from '../molecules/FormControl'
import Button from '../atoms/Button'

const updateProfileFormSchema = yup.object().shape({
  name: yup.string().min(3).max(50),
  city: yup.string(),
  description: yup.string(),
})

export default function UserProfileForm({ name, city, description, onSubmit, onClose }) {
  return (
    <div>
      <Formik
        initialValues={{
          name,
          city,
          description,
        }}
        validationSchema={updateProfileFormSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <FormControl name="name" label="Name" placeholder="Your name"></FormControl>
          <FormControl name="city" label="City" placeholder="Your city"></FormControl>
          <FormControl name="description" label="Description" placeholder="Tell everyone about yourself"></FormControl>
          <div className="modal-action">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" className="btn-primary">
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
