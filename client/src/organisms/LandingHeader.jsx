import Button from '../atoms/Button'
import Link from '../atoms/Link'
import VerticalLine from '../atoms/VerticalLine'

export default function LandingHeader({ greet }) {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between p-6">
      <div>
        <h1 className="px-4 mt-8 text-6xl font-extrabold">Join.me!</h1>
        <h2 className="px-4 mt-4 text-2xl font-bold">{greet}</h2>
      </div>
      <div className="flex self-end md:self-start">
        <div className="flex flex-col justify-center">
          <Link>Login</Link>
        </div>
        <VerticalLine />
        <Button className="btn-primary uppercase">Create account</Button>
      </div>
    </div>
  )
}
