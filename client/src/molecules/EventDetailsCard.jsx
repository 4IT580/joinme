import Title from '../atoms/Title'

export default function EventDetailsCard({ event }) {
  return (
    <>
      <Title level={2}>{event.name}</Title>
      <p>{event.description}</p>
    </>
  )
}
