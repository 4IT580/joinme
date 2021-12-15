import { FRONTEND_URL } from '../../../config.js'
import * as token from '../../../lib/token.js'
import { send } from '../../../lib/mail.js'
import fetchOrCreateUser from './fetchOrCreateUser.js'

export default async (event, email) => {
  const user = await fetchOrCreateUser(email)

  await send({
    to: email,
    subject: `Invitation to "${event.name}"!`,
    html: getEmailContent({ user, event }),
  })

  return user
}

const getEmailContent = ({ user, event }) => {
  const encodedToken = encodeURIComponent(token.create({ id: user.id }))
  const link = `${FRONTEND_URL}/event/${event.id}?token=${encodedToken}`

  return `<div style="flex-wrap: wrap; justify-content: center; text-align: center;">
  <div style="padding-top: 2rem; padding-bottom: 2rem; background-color: #1A1A1A"><img src="${FRONTEND_URL}/maillogo.png" alt="join.me logo"></div>

  <div style="padding-top: 2rem; font-size: 1.5rem;
  line-height: 2rem; font-weight: 700; margin-left: 4rem;
  margin-right: 4rem;"> <p>You have been invited to "${event.name}"!</p>
</div>

<div style="font-size: 1rem; line-height: 1.75rem; margin-left: 3rem; margin-right: 3rem; ">
<p>Someone can't wait for you to join them. Press the button below to check the event
</p></div>

<div style="margin-left: 4rem; margin-right: 4rem; padding-top: 1rem; padding-bottom: 4rem; "><a href="${link}" style="background-color: #FB165E;
border: none;
border-radius: 12px;
color: white;
padding: 12px 20px;
text-decoration: none;
font-size: 16px;
font-weight: 700;
cursor: pointer;">CHECK EVENT</a>
</div>

<div style=" padding-top: 1rem; padding-bottom: 2rem; font-size: 1rem;
line-height: 1.75rem; background-color: #E5E5E5; color: #4D4D4D;">
 <div>sincerely yours, team joinme ;)</div>
<a href="https://joinme.cz">joinme.cz</a></div>
  `
}
