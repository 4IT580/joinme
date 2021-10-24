import Button from '../atoms/Button'
import Link from '../atoms/Link'
import VerticalLine from '../atoms/VerticalLine'

export default function LandingHeader() {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between p-6">
      <h1 className="px-4 mt-8 text-6xl font-extrabold">Join.me!</h1>
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
