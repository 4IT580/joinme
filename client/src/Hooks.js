import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useRouteQuery = () => {
  return Object.fromEntries(new URLSearchParams(useLocation().search))
}

export const useScript = (src, callback) => {
  useEffect(() => {
    const exists = !!document.querySelector(`script[src="${src}"]`)
    if (exists) return

    const script = document.createElement('script')
    script.setAttribute('src', src)
    document.head.appendChild(script)

    if (callback) return callback()
  }, [])
}
