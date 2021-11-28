import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

export default function MultiInput({ value = [], separator = ' ', type = 'text', className, onChange, ...props }) {
  const [values, setValues] = useState(value)
  const inputRef = useRef()

  const onInput = (e) => {
    e.preventDefault()

    setValues(
      [...values.slice(0, -1), ...e.target.value.split(separator)]
        .reverse()
        .filter((value, index, self) => self.indexOf(value) === index)
        .reverse(),
    )

    onChange({ target: { name: props.name, value: values } })
  }

  const onRemove = (value) => {
    setValues(values.filter((v) => v !== value))
  }

  useEffect(() => {
    onChange({ target: { name: props.name, value: values.join(separator) } })
  }, [values])

  return (
    <div
      className="flex flex-wrap gap-2 input input-bordered p-2 cursor-text"
      style={{ height: 'fit-content' }}
      onClick={() => inputRef.current.focus()}
    >
      <div className="my-auto flex flex-wrap gap-2">
        {values.slice(0, -1).map((value) => (
          <span key={value} className="flex px-2 rounded bg-gray-200 cursor-default">
            {value}
            <XIcon className="w-4 h-4 my-auto ml-2 cursor-pointer" onClick={() => onRemove(value)} />
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type={type}
        className={classNames('focus:outline-none')}
        value={values.slice(-1).join('')}
        onInput={onInput}
        onChange={() => undefined}
        {...props}
      />
    </div>
  )
}
