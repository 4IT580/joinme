export default function InlineInput({ value, onChange, placeholder }) {
  return (
    <div className="border-b-2 border-black">
      <input
        className={'pb-1 outline-none'}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
