import { db } from '../../lib/db.js'
import acceptCircleInvitation from './resolvers/acceptInvitation.js'
import myCircleInvitations from './resolvers/myInvitations.js'
import circle from './resolvers/circle.js'
import myCircles from './resolvers/myCircles.js'
import createCircle from './resolvers/createCircle.js'
import editCircle from './resolvers/editCircle.js'
import circleInvite from './resolvers/invite.js'
import removeFromCircle from './resolvers/removeFromCircle.js'
import declineCircleInvitation from './resolvers/declineInvitation.js'


export default{
    Query: {
        myCircleInvitations,
        circle,
        myCircles,
    },
    Mutation: {
        createCircle,
        editCircle,
        circleInvite,
        removeFromCircle,
        acceptCircleInvitation,
        declineCircleInvitation
    },
    Circle: {
        members: async (parent) => {
            const userIds = await db()
                .pluck('user_id')
                .from('circle_memberships')
                .where('circle_id', parent.id)
                //.andWhere('accepted', true)

            return await db().select('*').from('users').whereIn('id', userIds)
        }
    }
}