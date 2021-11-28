import classNames from 'classnames'

export default function Badge({ className, children }) {
  return <span className={classNames('bg-gray-200 py-1 px-2 rounded-full', className)}>{children}</span>
}
