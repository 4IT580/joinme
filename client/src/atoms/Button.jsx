import classNames from 'classnames'

export default function Button({ children, ...attrs }) {
  const { className, ...rest } = attrs

  return (
    <button
      className={classNames('text-white bg-pink-500 hover:bg-pink-600 py-2 px-4 rounded-xl', className)}
      {...rest}
    >
      {children}
    </button>
  )
}
