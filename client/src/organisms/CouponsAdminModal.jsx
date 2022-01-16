import classNames from 'classnames'
import { useState } from 'react'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import CouponVerification from '../molecules/CouponVerification'
import CouponCreation from '../molecules/CouponCreation'

export default function CouponsAdminModal({ event, refetch, onClose }) {
  const [isVerifyOpen, setIsVerifyOpen] = useState(true)

  return (
    <Modal>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button
          className={classNames('flex-grow', { 'btn-primary': isVerifyOpen })}
          onClick={() => setIsVerifyOpen(true)}
        >
          Verify coupon
        </Button>
        <Button
          className={classNames('flex-grow', { 'btn-primary': !isVerifyOpen })}
          onClick={() => setIsVerifyOpen(false)}
        >
          Create coupon
        </Button>
      </div>

      {isVerifyOpen && <CouponVerification onClose={onClose} />}
      {!isVerifyOpen && <CouponCreation event={event} refetch={refetch} onClose={onClose} />}
    </Modal>
  )
}
