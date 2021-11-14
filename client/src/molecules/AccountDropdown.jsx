import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import Dropdown from '../atoms/Dropdown'
import { useAuth } from '../utils/auth'

export default function AccountDropdown({ className }) {
  const history = useHistory()
  const auth = useAuth()

  return (
    <Dropdown className={classNames(className)} title={`Hey, ${(auth.user || {}).name}`}>
      <Dropdown.Item onClick={() => history.push('/profile')}>Profile</Dropdown.Item>
      <Dropdown.Item onClick={auth.signout}>Logout</Dropdown.Item>
    </Dropdown>
  )
}
