export const parsePlace = (place) => {
  try {
    return JSON.parse(place) || {}
  } catch {
    return {}
  }
}
