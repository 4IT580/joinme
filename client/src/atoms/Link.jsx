import classNames from 'classnames'

export default function Link({ to = 'javascript:void(0)', children, ...attrs }) {
  const { className, ...rest } = attrs

  return (
    <a href={to} className={classNames('link', className)} {...rest}>
      {children}
    </a>
  )
}
