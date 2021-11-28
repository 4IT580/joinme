import classNames from 'classnames'

const classes = {
  1: 'text-4xl font-extrabold mb-2',
  2: 'text-2xl font-bold mb-2',
  3: 'text-xl font-bold mb-2',
}

export default function Title({ level = 1, children, className, ...props }) {


  const Component = `h${level}`

  return (
    <Component className={classNames(classes[level], className)} {...props}>
      {children}
    </Component>
  )
}
