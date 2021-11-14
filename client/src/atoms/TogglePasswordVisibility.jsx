import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

export default function togglePasswordVisibility({ passwordShown, onClick }) {
  return (
    <button
      type="button"
      tabIndex="-1"
      onClick={onClick}
      className="absolute top-0 right-0 rounded-l-none btn btn-primary"
    >
      {passwordShown ? <EyeOffIcon className="w-6" /> : <EyeIcon className="w-6" />}
    </button>
  )
}
