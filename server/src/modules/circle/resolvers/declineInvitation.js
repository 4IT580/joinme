import { db } from "../../../lib/db.js";

export default async (_, {invitationId}) => {
    await db().table('circle_memberships').where('id', invitationId).delete()

    return true
}