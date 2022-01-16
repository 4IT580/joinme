import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import QrReader from 'react-qr-reader'
import Button from '../atoms/Button'
import { useNotifications } from '../utils/notifications'

export default function CouponVerification({ onClose }) {
  const notifications = useNotifications()
  const [verifyCoupon] = useMutation(verifyCouponMutation)
  const [isVerifying, setIsVerifying] = useState(false)

  const onScan = async (data) => {
    if (!data) return
    if (isVerifying) return

    try {
      setIsVerifying(true)

      const response = await verifyCoupon({ variables: { data } })
      notifications.pushSuccess({ text: `Coupon "${response.verifyCoupon.name}" verified` })
    } catch (e) {
      notifications.pushError({ text: e.message })
    } finally {
      setIsVerifying(false)
      onClose()
    }
  }

  return (
    <>
      <QrReader onScan={onScan} onError={(error) => console.log(error)} />
      <div className="modal-action">
        <Button onClick={onClose}>Close</Button>
      </div>
    </>
  )
}

const verifyCouponMutation = gql`
  mutation ($data: String!) {
    verifyCoupon(data: $data) {
      id
      name
    }
  }
`
