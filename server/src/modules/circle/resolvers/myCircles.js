import { db } from "../../../lib/db.js";
import { getUser } from "../../../lib/auth.js";

export default async (_, __, {auth}) =>{
    const user = await getUser(auth)

    const circles = await db()
        .select('*')
        .from('circles')
        .where('owner_id', user.id)

    return circles
}