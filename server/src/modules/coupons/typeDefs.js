import { gql } from 'apollo-server'

export default gql`
  type Coupon {
    id: Int!
    value: String!
    name: String!
    description: String!
    event: Event!
  }

  type Event {
    coupons: [Coupon!]!
  }

  input CouponInput {
    eventId: Int!
    name: String!
    description: String!
  }

  type Mutation {
    createCoupon(input: CouponInput!): Coupon!
    verifyCoupon(data: String!): Boolean
  }
`
