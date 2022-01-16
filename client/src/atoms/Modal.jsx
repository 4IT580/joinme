import classNames from 'classnames'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ children }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  })

  return createPortal(
    <div className={classNames('modal modal-open')}>
      <div className="modal-box max-h-screen overflow-y-auto">{children}</div>
    </div>,
    document.body,
  )
}
