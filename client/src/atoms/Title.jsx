import classNames from 'classnames'

const classes = {
  1: 'text-4xl font-extrabold',
}

export default function Title({ level = 1, children, className, ...rest }) {


  const Tag = `h${level}`

  return (
    <Tag className={classNames(classes[level], className)} {...rest}>
      {children}
    </Tag>
  )
}
