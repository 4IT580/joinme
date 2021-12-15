import { Formik, Form } from 'formik'
import { gql, useMutation } from '@apollo/client'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'
import MultiInput from '../atoms/MultiInput'
import CircleMember from '../molecules/CircleMember'
import FormControl from '../molecules/FormControl'
import { useNotifications } from '../utils/notifications'

export default function CircleMembersModal({ circle, circleMembers, refetch, onClose }) {
  const notifications = useNotifications()
  const [inviteToCircle, inviteToCircleState] = useMutation(inviteToCircleMutation)

  return (
    <Modal>
      <Title className="mb-4">Members</Title>
      <Formik
        initialValues={{
          invites: [],
        }}
        onSubmit={async (input) => {
          try {
            await inviteToCircle({ variables: { circleId: circle.id, invites: input.invites } })
            notifications.pushSuccess({ text: 'Invited' })
            await refetch()
          } catch (e) {
            notifications.pushError({ text: e.message })
          }
        }}
      >
        <Form className="flex gap-4 my-4">
          <div className="flex-1">
            <FormControl Component={MultiInput} name="invites" placeholder="Email of new member" />
          </div>
          <Button type="submit" className="mt-4" loading={inviteToCircleState.loading}>
            Invite
          </Button>
        </Form>
      </Formik>
      {circleMembers.map((circleMember) => (
        <CircleMember key={circleMember.id} circle={circle} circleMember={circleMember} refetch={refetch} />
      ))}
      <Button className="mt-4" onClick={onClose}>
        Close
      </Button>
    </Modal>
  )
}

CircleMembersModal.fragments = {
  circleMember: CircleMember.fragments.circleMember,
}

const inviteToCircleMutation = gql`
  mutation ($circleId: Int!, $invites: String!) {
    inviteToCircle(circleId: $circleId, invites: $invites)
  }
`
