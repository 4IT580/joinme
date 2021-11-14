import classNames from 'classnames'

export default function Link({ to, children, className, ...props }) {
  return (
    <a href={to} className={classNames('link', className)} tabIndex="0" {...props}>
      {children}
    </a>
  )
}
