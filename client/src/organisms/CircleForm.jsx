import { Form, Formik } from 'formik'
import * as yup from 'yup'
import MultiInput from '../atoms/MultiInput'
import FormControl from '../molecules/FormControl'

export default function CircleForm({ initialValues, onSubmit, children }) {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      <Form>
        <FormControl name="name" label="Name" />
        <FormControl Component="textarea" className="textarea h-28" name="description" label="Description" />
        <FormControl name="colour" label="Colour" />
        {initialValues.invites && (
          <FormControl Component={MultiInput} name="invites" label="Emails of people you want to invite" />
        )}

        <div className="modal-action">{children}</div>
      </Form>
    </Formik>
  )
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  colour: yup.string().required('Colour is required'),
})
