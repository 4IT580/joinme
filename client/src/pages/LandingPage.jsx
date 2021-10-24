import LandingHeader from '../organisms/LandingHeader'
import LandingContent from '../organisms/LandingContent'

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <LandingHeader />
      <LandingContent />
    </div>
  )
}
