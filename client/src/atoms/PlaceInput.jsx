import { useEffect } from 'react'

export default function PlaceInput({ value, ...props }) {
  useEffect(() => {
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('place'))

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      props.onChange({ target: { name: props.name, value: place } })
    })
  }, [])

  return <input id="place" value={typeof value === 'string' ? value : value.name} {...props} />
}
