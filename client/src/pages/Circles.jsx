import { gql, useQuery } from '@apollo/client'
import DashboardLayout from '../organisms/DashboardLayout'
import CirclesTemplate from '../templates/CirclesTemplate'

export default function Circles() {
  const { data, refetch } = useQuery(circlesQuery)

  return <DashboardLayout>{data && <CirclesTemplate circles={data.myCircles} refetch={refetch} />}</DashboardLayout>
}

const circlesQuery = gql`
  query {
    myCircles {
      ...circle
    }
  }

  ${CirclesTemplate.fragments.circle()}
`
