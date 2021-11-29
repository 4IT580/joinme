import { getUserWithImageById } from '../../../lib/user.js'

export default async (_, params) => {
  const user = await getUserWithImageById(params.id)

  return {
    ...user,
    interests: user.interests?.split(',').filter(Boolean) ?? [],
  }
}
