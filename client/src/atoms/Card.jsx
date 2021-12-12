import classNames from 'classnames'

export default function Card({ className, children }) {
  return <div className={classNames('bg-white rounded-2xl shadow-lg p-4', className)}>{children}</div>
}
