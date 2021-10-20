export default function Link({ children }) {
  return (
    <a href="javascript:void(0)" className="hover:underline">
      {children}
    </a>
  )
}
