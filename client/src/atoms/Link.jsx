import classNames from 'classnames'

export default function Link({ to, children, className, ...rest }) {
  return (
    <a href={to} className={classNames('link', className)} tabIndex="0" {...rest}>
      {children}
    </a>
  )
}
