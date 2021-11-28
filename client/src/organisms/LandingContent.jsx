import Button from '../atoms/Button'
import image from '../assets/imglp.png'

export default function LandingContent() {
  return (
    <div className="flex flex-col-reverse lg:flex-row py-16">
      <div className="flex flex-col p-16 lg:w-1/3 text-white">
        <h2 className="text-4xl font-bold mt-16 uppercase">How to start making new friends</h2>
        <ul className="text-xl mt-16">
          <li>Ready for event?</li>
          <li>Meet people in group immediately</li>
          <li>Chat driven by interests</li>
        </ul>
        <div>
          <Button className="btn-primary mt-16 uppercase">Let's start!</Button>
        </div>
      </div>
      <div className="flex flex-grow justify-center p-8 lg:-mt-48 pointer-events-none">
        <img src={image} className="object-contain" width="1000" height="1000" />
      </div>
    </div>
  )
}
