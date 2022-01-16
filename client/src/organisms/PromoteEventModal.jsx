import { gql, useMutation } from '@apollo/client'
import dropin from 'braintree-web-drop-in'
import { useEffect, useState } from 'react'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import { useNotifications } from '../utils/notifications'

export default function PromoteEventModal({ event, refetch, onClose }) {
  const notifications = useNotifications()
  const [instance, setInstance] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [createBraintreeToken] = useMutation(createBraintreeTokenMutation)
  const [promoteEvent] = useMutation(promoteEventMutation)

  useEffect(async () => {
    const response = await createBraintreeToken()

    const container = document.querySelector('#dropin')

    const instance = await dropin.create({
      authorization: response.data.createBraintreeToken,
      container,
    })

    setInstance(instance)
  }, [])

  const onPay = async () => {
    setIsLoading(true)
    const { nonce } = await instance.requestPaymentMethod()
    await promoteEvent({ variables: { eventId: event.id, nonce } })
    setIsLoading(false)
    notifications.pushSuccess({ text: 'Event promoted' })
    onClose()
    await refetch()
  }

  return (
    <Modal>
      <Title>Promote event</Title>
      <div id="dropin" />
      <div className="flex gap-4 justify-center">
        {!isLoading && <Button onClick={onClose}>Cancel</Button>}
        <Button loading={isLoading} className="btn-primary" onClick={onPay}>
          Pay 10$
        </Button>
      </div>
    </Modal>
  )
}

const createBraintreeTokenMutation = gql`
  mutation {
    createBraintreeToken
  }
`

const promoteEventMutation = gql`
  mutation ($eventId: Int!, $nonce: String!) {
    promoteEvent(eventId: $eventId, nonce: $nonce)
  }
`
