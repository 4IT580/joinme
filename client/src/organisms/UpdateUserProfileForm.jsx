import * as yup from 'yup'
import { Formik, Form } from 'formik'
import FormControl from '../molecules/FormControl'
import Button from '../atoms/Button'
import MultiInput from '../atoms/MultiInput'

const updateProfileFormSchema = yup.object().shape({
  name: yup.string().min(3).max(50),
  city: yup.string().optional(),
  description: yup.string().optional(),
})

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const fileCallback = async (onSubmit) => {
  const file = document.getElementById('avatar').files[0]

  if (!file) {
    return
  }

  const base64 = await toBase64(file)
  onSubmit({ photo: base64 })
}

export default function UserProfileForm({ name, city, description, onSubmit, onClose, onPictureSubmit }) {
  return (
    <div>
      <input name="avatar" id="avatar" type="file" accept="image/png, image/jpeg" className="mb-2" />
      <br />
      <Button type="submit" className="btn-primary" onClick={() => fileCallback(onPictureSubmit)}>
        Submit
      </Button>

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
