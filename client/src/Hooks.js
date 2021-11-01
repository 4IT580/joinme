import { useLocation } from 'react-router-dom'

export const useRouteQuery = () => {
  return Object.fromEntries(new URLSearchParams(useLocation().search))
}
