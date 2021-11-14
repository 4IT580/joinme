import AccountInfo from '../organisms/AccountInfo'
import DashboardLayout from '../organisms/DashboardLayout'
import { useAuth } from '../utils/auth'
import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_ME_INFO = gql`
  query {
    me {
      name
      username
      city
      description
      interests
      photo
    }
  }
`

export default function UserProfileDashboard() {
  const auth = useAuth()
  const profile = useQuery(GET_ME_INFO)

  return (
    <DashboardLayout>
      <AccountInfo profileState={profile} />
    </DashboardLayout>
  )
}
