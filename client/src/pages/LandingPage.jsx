import LandingHeader from '../organisms/LandingHeader'
import LandingContent from '../organisms/LandingContent'
import { useQuery, gql } from '@apollo/client'

const GREET_QUERY = gql`
  query {
    greet
  }
`

export default function LandingPage() {
  const { data } = useQuery(GREET_QUERY)

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <LandingHeader greet={data?.greet ?? ''} />
      <LandingContent />
    </div>
  )
}
