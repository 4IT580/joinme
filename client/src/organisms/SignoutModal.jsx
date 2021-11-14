import { gql, useMutation } from '@apollo/client'
import { useAuth } from '../utils/auth'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Title from '../atoms/Title'

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`

export default function SignoutModal({ onClose}) {
  const auth = useAuth()
const { data } = useQuery(ME_QUERY)
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Modal>
      <Title className="mb-4">Are you sure you want to sign out?</Title>    
          <div className="modal-action">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="button" onClick={auth.signout} className="btn-primary">
             Sign out
            </Button>
          </div>
    </Modal>
  )
}

