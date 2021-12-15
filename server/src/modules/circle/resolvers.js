import { db } from '../../lib/db.js'
import acceptCircleInvitation from './resolvers/acceptInvitation.js'
import myCircleInvitations from './resolvers/myInvitations.js'
import circle from './resolvers/circle.js'
import myCircles from './resolvers/myCircles.js'
import createCircle from './resolvers/createCircle.js'
import editCircle from './resolvers/editCircle.js'
import deleteCircle from './resolvers/deleteCircle.js'
import circleInvite from './resolvers/invite.js'
import removeFromCircle from './resolvers/removeFromCircle.js'
import declineCircleInvitation from './resolvers/declineInvitation.js'
import { BACKEND_URL } from '../../config.js'

export default {
  Query: {
    myCircleInvitations,
    circle,
    myCircles,
  },
  Mutation: {
    createCircle,
    editCircle,
    deleteCircle,
    circleInvite,
    removeFromCircle,
    acceptCircleInvitation,
    declineCircleInvitation,
  },
  Circle: {
    members: async (parent) => {
      const userIds = await db().pluck('member_id').from('circle_memberships').where('circle_id', parent.id)

      const users = await db()
        .select(['users.*', 'images.path as photo'])
        .from('users')
        .whereIn('users.id', userIds)
        .join('images', 'images.id', '=', 'users.photo_id')

      return users.map((user) => ({ ...user, photo: BACKEND_URL + '/images/' + user.photo }))
    },
  },
}
