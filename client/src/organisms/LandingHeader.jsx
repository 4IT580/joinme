import Button from '../atoms/Button'
import Link from '../atoms/Link'
import VerticalLine from '../atoms/VerticalLine'
import image from '../assets/w_p_logo.png'

export default function LandingHeader({ greet, onCreateAccount, onLogin }) {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between p-6 text-white">
      <div>
       <img src={image} className="object-contain ml-10 mt-1" width="200"  />
        
      </div>
      <div className="flex self-end md:self-start">
        <div className="flex flex-col justify-center">
          <Link onClick={onLogin}>Log in</Link>
        </div>
        <VerticalLine />
        <Button className="btn-primary uppercase" onClick={onCreateAccount}>
          Create account
        </Button>
      </div>
    </div>
  )
}
