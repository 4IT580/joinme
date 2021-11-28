import { gql } from '@apollo/client'
import Title from '../atoms/Title'
import Card from '../atoms/Card'
import Badge from '../atoms/Badge'

export default function UserDetailTemplate({ user }) {
  return (
    <div className="flex p-1">
      <Card>
        <div className="text-center">
          <Title>{user.name}</Title>
          <Title level={2}>@{user.username}</Title>
        </div>

        <div className="border-t -mx-4 my-4" />

        <div>
          <Title level={3} className="mb-2">
            About
          </Title>
          <p>{user.description}</p>
        </div>

        <div>
          <Title level={3} className="mb-2">
            City
          </Title>
          <p>{user.city}</p>
        </div>

        <div>
          <Title level={3} className="mb-2">
            Interests
          </Title>
          {user.interests.map((interest) => (
            <Badge className="mr-2">{interest}</Badge>
          ))}
        </div>
      </Card>
    </div>
  )
}

UserDetailTemplate.fragments = {
  user: (name = 'user') => gql`
    fragment ${name} on User {
      id
      username
      name
      email
      photo
      city
      description
      interests
    }
  `,
}
