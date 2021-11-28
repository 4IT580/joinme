import classNames from 'classnames'
import { useEffect } from 'react'

export default function Modal({ children }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  })

  return (
    <div className={classNames('modal modal-open')}>
      <div className="modal-box max-h-screen overflow-y-auto">{children}</div>
    </div>
  )
}
