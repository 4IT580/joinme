import { db } from "../../../lib/db.js";
import { getUser } from "../../../lib/auth.js";

export default async (_, { circleId, userId }, { auth }) =>{
    const user = await getUser(auth)

    const circle = await db().select('*').from('circles').where('id', circleId)

    if(circle === null || circle.owner_id !== user.id){
        return false
    }

    await db().table('circle_memberships')
        .where({
            'member_id': invitationId,
            'circle_id': circleId
        })
        .delete()

    return false
}