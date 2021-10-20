import Button from '../atoms/Button'
import image from '../assets/404_2.png'

export default function LandingContent() {
  return (
    <div className="flex flex-col-reverse lg:flex-row py-16">
      <div className="flex flex-col justify-end p-16 w-96">
        <h2 className="text-4xl font-bold mt-16 uppercase">How to start making new fiends</h2>
        <ul className="text-xl mt-16">
          <li>Ready for event?</li>
          <li>Meet people in group immediatelly</li>
          <li>Chat driven by interests</li>
        </ul>
        <Button className="mt-16 uppercase">Let's start!</Button>
      </div>
      <div className="flex flex-grow justify-center">
        <img src={image} className="object-contain" />
      </div>
    </div>
  )
}