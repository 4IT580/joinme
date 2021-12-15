import { useState } from 'react'
import Button from '../atoms/Button'
import Card from '../atoms/Card'
import Title from '../atoms/Title'
import Circle from '../molecules/Circle'
import CreateCircleModal from '../organisms/CreateCircleModal'

export default function CirclesTemplate({ circles, refetch }) {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)

  return (
    <>
      <Card className="m-2 bg-gray-100">
        <div className="flex justify-between">
          <Title>Your circles</Title>
          <Button onClick={() => setIsCreateModalVisible(true)}>Create circle</Button>
        </div>

        <div className="flex gap-4 flex-wrap">
          {circles.map((circle) => (
            <Circle key={circle.id} circle={circle} refetch={refetch} />
          ))}
        </div>
      </Card>

      {isCreateModalVisible && <CreateCircleModal refetch={refetch} onClose={() => setIsCreateModalVisible(false)} />}
    </>
  )
}

CirclesTemplate.fragments = {
  circle: Circle.fragments.circle,
}
