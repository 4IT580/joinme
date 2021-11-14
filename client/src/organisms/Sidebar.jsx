export default function Sidebar() {
  return (
    <div className="h-full flex flex-col w-12">
      <div className="bg-gray-800 rounded-xl shadow-md flex-grow">
        <slot />
      </div>
    </div>
  )
}
