import classNames from 'classnames'
import { useField } from 'formik'
import Error from '../atoms/Error'

export default function FormControl({ name, label, ...attrs }) {
  const [field, meta] = useField(name)
  const error = meta.touched && meta.error

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input className={classNames('input input-bordered', { 'input-error': !!error })} {...field} {...attrs} />
      <Error error={error} />
    </div>
  )
}
