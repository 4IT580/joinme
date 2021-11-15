import { getUser } from '../../../lib/auth.js'

export default async (_, __, { auth }) => {
  const user = await getUser(auth)

  return {
    ...user,
    interests: parseInterests(user),
  }
}

const parseInterests = (user) => {
  try {
    return user.interests.split(',')
  } catch {
    return []
  }
}
