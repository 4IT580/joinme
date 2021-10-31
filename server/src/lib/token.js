import jwt from 'jsonwebtoken'

export const create = (content) => {
  return jwt.sign(content, process.env.JWT_SECRET)
}

export const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
