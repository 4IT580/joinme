import { useHistory } from 'react-router'
import ResetPasswordModal from '../organisms/ResetPasswordModal.jsx'

export default function ResetPassword() {
  const history = useHistory()

  return <ResetPasswordModal onClose={() => history.push('/')} />
}
