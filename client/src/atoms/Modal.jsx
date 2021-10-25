import classNames from 'classnames'

export default function Modal({ children }) {
  return (
    <div className={classNames('modal modal-open')}>
      <div className="modal-box">{children}</div>
    </div>
  )
}
