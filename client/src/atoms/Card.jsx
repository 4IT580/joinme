import classNames from 'classnames'

export default function Card({ className, children }) {
  return <div className={classNames('rounded-lg shadow-lg p-4', className)}>{children}</div>
}
