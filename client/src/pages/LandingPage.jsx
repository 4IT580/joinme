import { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import LandingHeader from '../organisms/LandingHeader'
import LandingContent from '../organisms/LandingContent'
import RegisterModal from '../organisms/RegisterModal'
import LoginModal from '../organisms/LoginModal'

const GREET_QUERY = gql`
  query {
    greet
  }
`

export default function LandingPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const { data } = useQuery(GREET_QUERY)

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <LandingHeader
        greet={data?.greet ?? ''}
        onCreateAccount={() => setIsRegisterModalOpen(true)}
        onLogin={() => setIsLoginModalOpen(true)}
      />
      <LandingContent />

      {isRegisterModalOpen && <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />}
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
    </div>
  )
}
