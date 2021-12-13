import { db } from '../../../lib/db.js'
import { getUser } from '../../../lib/auth.js'

export default async (_, {circleId, invites}, {auth}) => {
    const user = await getUser(auth)

    const circle = (await db().select('*').from('circles').where('id', circleId)).first()

    if(circle.owner_id === user.id){
        for(const email of invites.split(' ').filter(Boolean)) {
            const user = await db()
                .select('*')
                .from('users')
                .where('email', email)
                .first()

            await db().insert({accepted: false, memberId: user.id, circleId: id})
                .into('circle_memberships')
        }

        return true
    }

    return false
}