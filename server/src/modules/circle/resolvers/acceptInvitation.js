import { db } from "../../../lib/db.js";

export default async (_, {invitationId}) =>{
    await db().table('circle_memberships').update({accepted: true}).where('id', invitationId)

    return true
}