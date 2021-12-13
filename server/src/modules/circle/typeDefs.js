import {gql} from 'apollo-server'

export default gql`
    type Circle {
        id: Int!
        name: String!
        description: String!
        colour: String!
        members: [User!]!
    }

    input CircleInput{
        name: String!
        description: String
        colour: String!
    }

    type Invitation {
        id: Int!
        accepted: Boolean
        name: String!
        colour: String!
    }

    type Query {
        myCircleInvitations: [Invitation!]!
        circle(circleId: Int!): Circle
        myCircles: [Circle!]!
    }

    type Mutation {
        createCircle(input: CircleInput!, invites: String!): Circle!
        editCircle(circleId: Int!, input: CircleInput!): Circle!
        circleInvite(circleId: Int!, invites: String!): Boolean!
        removeFromCircle(circleId: Int!, userId: Int!): Boolean!
        acceptCircleInvitation(invitationId: Int!): Boolean!
        declineCircleInvitation(invitationId: Int!): Boolean!
    }
`