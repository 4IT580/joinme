import classNames from 'classnames'

export default function Input({ type = 'text', className, ...props }) {
  return <input type={type} className={classNames('input input-bordered', className)} {...props} />
}
