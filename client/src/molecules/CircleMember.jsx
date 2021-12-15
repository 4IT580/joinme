import { gql, useMutation } from '@apollo/client'
import Button from '../atoms/Button'
import Title from '../atoms/Title'

export default function CircleMember({ circle, circleMember, refetch }) {
  const [removeFromCircle, removeFromCircleState] = useMutation(removeFromCircleMutation)

  return (
    <div className="flex justify-between">
      <img src={circleMember.photo} alt={circleMember.name} className="rounded-full w-16 h-16" />
      <div className="flex flex-col">
        <Title level={2}>{circleMember.name}</Title>
        <small>{circleMember.username}</small>
      </div>
      <Button
        loading={removeFromCircleState.loading}
        onClick={async () => {
          await removeFromCircle({ variables: { circleId: circle.id, userId: circleMember.id } })
          await refetch()
        }}
      >
        X
      </Button>
    </div>
  )
}

CircleMember.fragments = {
  circleMember: (name = 'circleMember') => gql`
    fragment ${name} on User {
      id
      name
      username
      photo
    }
  `,
}

const removeFromCircleMutation = gql`
  mutation ($circleId: Int!, $userId: Int!) {
    removeFromCircle(circleId: $circleId, userId: $userId)
  }
`
