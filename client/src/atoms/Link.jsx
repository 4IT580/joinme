import classNames from 'classnames'

export default function Link({ to = '#', children, ...attrs }) {
  const { className, ...rest } = attrs

  return (
    <a href={to} className={classNames('link', className)} {...rest}>
      {children}
    </a>
  )
}
