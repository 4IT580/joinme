import { db } from "../../../lib/db.js";
import { getUser } from "../../../lib/auth.js";

export default async (_, __, {auth}) =>{
    const user = await getUser(auth)

    const invitations = await db().select('*')
        .from('circle_memberships')
        .join('circles', 'circle_memberships.circle_id', '=', 'circles.id')
        .where('member_id', user.id)

    return invitations
}