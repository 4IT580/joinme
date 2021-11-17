import { createContext, useContext, useState } from 'react'

const LOCAL_STORAGE_TOKEN_KEY = 'joinme-auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getInitialToken())

  const value = {
    token,
    signin: ({ token }) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
      setToken(token)
    },
    signout: () => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, null)
      setToken(null)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

const getInitialToken = () => {
  if (window.location.search) {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
      return token
    }
  }

  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  if (token) {
    return token
  }

  return null
}
