import classNames from 'classnames'

export const TYPE_SUCCESS = 'success'
export const TYPE_ERROR = 'error'
export const TYPE_WARNING = 'warning'
export const TYPE_INFO = 'info'

export default function Alert({ type, children }) {
  return (
    <div
      className={classNames('alert', {
        'alert-success': type === TYPE_SUCCESS,
        'alert-error': type === TYPE_ERROR,
        'alert-warning': type === TYPE_WARNING,
        'alert-info': type === TYPE_INFO,
      })}
    >
      <div className="flex-1">
        <label>{children}</label>
      </div>
    </div>
  )
}
