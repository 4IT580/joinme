import { gql } from '@apollo/client'
import { useState } from 'react'
import Button from '../atoms/Button'
import Card from '../atoms/Card'
import Title from '../atoms/Title'
import EditCircleModal from '../organisms/EditCircleModal'

export default function Circle({ circle, refetch }) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)

  return (
    <>
      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: circle.colour }} />
            <div className="flex flex-col">
              <Title level={2}>{circle.name}</Title>
              <p>{circle.description}</p>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <Button className="w-32">Delete</Button>
            <Button className="w-32" onClick={() => setIsEditModalVisible(true)}>
              Edit
            </Button>
          </div>
        </div>
      </Card>

      {isEditModalVisible && (
        <EditCircleModal circle={circle} refetch={refetch} onClose={() => setIsEditModalVisible(false)} />
      )}
    </>
  )
}

Circle.fragments = {
  circle: (name = 'circle') => gql`
    fragment ${name} on Circle {
      id
      name
      description
      colour
    }
  `,
}
