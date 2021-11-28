import classNames from 'classnames'

export default function Button({ type = 'button', loading = false, onClick, children, className, ...props }) {
  return (
    <button type={type} className={classNames('btn', { loading }, className)} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
