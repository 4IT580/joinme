import Button from '../atoms/Button'

function PeopleMenu({ children }) {
  return <ul className="flex flex-grow menu max-h-80 hover:overflow-y-auto bg-gray-100 rounded-box">{children}</ul>
}

function PeopleItem({ image, name, username }) {
  return (
    <li>
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-center bg-white rounded-xl my-0.5 p-2">
        <div className="grid grid-cols-2 items-center gap-x-5 p-1">
          <img src={image} alt="user" className="w-24 rounded-full col-span-2 sm:col-span-1" />
          <div className="flex flex-col col-span-2 sm:col-span-1">
            <p className="font-bold">{name}</p>
            <p>{username}</p>
          </div>
        </div>
        <Button
          onClick={async () => {
            console.log('Removing ' + name + ' from circle')
          }}
        >
          Remove from circle
        </Button>
      </div>
    </li>
  )
}

PeopleMenu.PeopleItem = PeopleItem

export default PeopleMenu
