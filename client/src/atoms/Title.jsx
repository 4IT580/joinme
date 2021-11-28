import classNames from 'classnames'

const classes = {
  1: 'text-4xl font-extrabold',
  2: 'text-2xl font-bold',
  3: 'text-xl font-bold',
}

export default function Title({ level = 1, children, className, ...props }) {


  const Component = `h${level}`

  return (
    <Component className={classNames(classes[level], className)} {...props}>
      {children}
    </Component>
  )
}
