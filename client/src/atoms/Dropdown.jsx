function Dropdown({ title, children }) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex="0" className="btn">
        {title}
      </div>
      <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">{children}</ul>
    </div>
  )
}

function Item({ onClick, children }) {
  return (
    <li>
      <a tabIndex="0" href="#" onClick={onClick}>
        {children}
      </a>
    </li>
  )
}

Dropdown.Item = Item

export default Dropdown
