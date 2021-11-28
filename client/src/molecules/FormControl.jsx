import classNames from 'classnames'
import { useField } from 'formik'
import React, { useState } from 'react'
import Error from '../atoms/Error'
import TogglePasswordVisibility from '../atoms/TogglePasswordVisibility'

export default function FormControl({ Component = 'input', name, label, placeholder, type, className, ...attrs }) {
  const [field, meta] = useField(name)
  const error = meta.touched && meta.error
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative">
        <Component
          type={type === 'password' && passwordShown ? 'text' : type}
          name={name}
          placeholder={placeholder}
          className={classNames(className, {
            'toggle': type === 'checkbox',
            'w-full input input-bordered': type !== 'checkbox',
            'input-error': !!error,
          })}
          {...field}
          {...attrs}
        />

        {type === 'password' && (
          <TogglePasswordVisibility passwordShown={passwordShown} onClick={togglePasswordVisibility} />
        )}
      </div>

      <Error error={error} />
    </div>
  )
}
