export default function Error({ error }) {
  if (!error) return null

  return (
    <label className="label">
      <span className="label-text-alt text-red-400">{error}</span>
    </label>
  )
}
