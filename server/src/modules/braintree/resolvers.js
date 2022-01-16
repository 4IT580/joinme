import braintree from 'braintree'
import { db } from '../../lib/db.js'

const merchantId = process.env.BRAINTREE_MERCHANT_ID
const publicKey = process.env.BRAINTREE_PUBLIC_KEY
const privateKey = process.env.BRAINTREE_PRIVATE_KEY

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId,
  publicKey,
  privateKey,
})

export default {
  Mutation: {
    createBraintreeToken: async () => {
      const { clientToken } = await gateway.clientToken.generate({})

      return clientToken
    },
    promoteEvent: async (_, { eventId, nonce }) => {
      const response = await gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      })

      if (!response.success) throw new Error('Transaction failed')

      await db().table('events').update({ promoted: true }).where('id', eventId)

      return true
    },
  },
}
