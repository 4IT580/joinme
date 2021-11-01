import classNames from 'classnames'

const classes = {
  1: 'text-4xl font-extrabold',
}

export default function Title({ level = 1, children, className, ...rest }) {


  const Component = `h${level}`

  return (
    <Component className={classNames(classes[level], className)} {...rest}>
      {children}
    </Component>
  )
}
