import { useState } from 'react'
import QrCode from 'react-qr-code'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import { useUser } from '../utils/user'

export default function CouponsModal({ event, onClose }) {
  const user = useUser()

  const [coupon, setCoupon] = useState(null)

  return (
    <Modal>
      {coupon && (
        <Modal>
          <Title className="text-center">{coupon.name}</Title>
          <QrCode className="mx-auto my-4" value={`${user.profile.username}:${coupon.value}`} />
          <div className="flex justify-center">
            <Button className="mt-4" onClick={() => setCoupon(null)}>
              Close
            </Button>
          </div>
        </Modal>
      )}

      <div className="flex flex-col gap-4">
        {event.coupons.map((coupon) => (
          <div key={coupon.id} className="flex justify-center">
            <Button className="btn-primary" onClick={() => setCoupon(coupon)}>
              {coupon.name}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <Button className="mt-4" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  )
}
