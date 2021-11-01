import Button from '../atoms/Button'


export default function LandingContent() {
  return (
    <div className="flex flex-col-reverse lg:flex-row py-16">
      <div className="flex flex-col justify-end p-16 w-96 text-white">
        <h2 className="text-4xl font-bold mt-16 uppercase">How to start making new friends</h2>
        <ul className="text-xl mt-16">
          <li>Ready for event?</li>
          <li>Meet people in group immediately</li>
          <li>Chat driven by interests</li>
        </ul>
        <Button className="btn-primary mt-16 uppercase">Let's start!</Button>
      </div>
      <div className="flex flex-grow justify-end align-top fixed top-0 right-0 p-8">
       
      </div>
    </div>
  )
}
