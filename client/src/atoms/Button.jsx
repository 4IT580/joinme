import classNames from 'classnames'

export default function Button({ children, ...attrs }) {
  const { className, ...rest } = attrs

  return (
    <button className={classNames('btn', className)} {...rest}>
      {children}
    </button>
  )
}
