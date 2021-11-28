import Title from "../atoms/Title";

export default function EventDescription({ description }) {
  return (
    <div className="flex flex-col col-span-5 lg:col-span-3  bg-white rounded-2xl p-4">
      <Title level="2">Description</Title>
      {description}
    </div>
  )
}
