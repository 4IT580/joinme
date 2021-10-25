import classNames from 'classnames'

export default function Button({ type = 'button', loading = false, onClick, children, ...attrs }) {
  const { className, ...rest } = attrs

  return (
    <button type={type} className={classNames('btn', { loading }, className)} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
