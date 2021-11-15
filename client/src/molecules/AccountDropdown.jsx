import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import Dropdown from '../atoms/Dropdown'
import { useAuth } from '../utils/auth'
import { useUser } from '../utils/user'

export default function AccountDropdown({ className }) {
  const history = useHistory()
  const auth = useAuth()
  const user = useUser()

  return (
    <Dropdown className={classNames(className)} title={`Hey, ${user.profile.name}`}>
      <Dropdown.Item onClick={() => history.push('/profile')}>Profile</Dropdown.Item>
      <Dropdown.Item onClick={auth.signout}>Logout</Dropdown.Item>
    </Dropdown>
  )
}
