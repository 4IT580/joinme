import { useHistory } from 'react-router-dom'
import ResetPasswordModal from '../organisms/ResetPasswordModal.jsx'

export default function ResetPassword() {
  const history = useHistory()

  return <ResetPasswordModal onClose={() => history.push('/')} />
}
