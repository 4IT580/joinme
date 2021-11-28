import { BACKEND_URL } from '../config'

export function toFullURL(url) {
  return BACKEND_URL + '/images/' + url
}
