import { useState, useEffect, useContext, createContext } from 'react'
import { NoneContextProvider } from './user/NoneContext'
import { ClientContextProvider } from './user/ClientContext'
import { SalesManagerContextProvider } from './user/SalesManagerContext'
import Utilities from '../utilities/Utilities'
import Provider from '../data/provider/Provider'
import { PROFILES } from '../config/const.js'

function UserProvider({ user, children }) {

  const { NONE, CLIENT, SALES_MANAGER } = PROFILES

  if (user === null) {
    return (
      <NoneContextProvider user={user} type={NONE}>
        {children}
      </NoneContextProvider>
    )
  } else if (user.profile?.id === CLIENT) {
    return (
      <ClientContextProvider user={user} type={CLIENT}>
        {children}
      </ClientContextProvider>
    )
  } else if (user.profile?.id === SALES_MANAGER) {
    return (
      <SalesManagerContextProvider user={user} type={SALES_MANAGER}>
        {children}
      </SalesManagerContextProvider>
    )
  } else {
    return (
      <NoneContextProvider user={user} type={NONE}>
        {children}
      </NoneContextProvider>
    )
  }
}

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('Context not found')
  return context
}

export function AuthContextProvider({ children }) {

  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState({})

  async function login() {
    setLoading(true)
    setLoading(false)
  }

  async function register() {
    setLoading(true)
    setLoading(false)
  }

  async function logout() {
    setLoading(true)
    setLoading(false)
  }

  async function verify() {
    setLoading(true)
    await Utilities.sleep(1)
    const res = Provider.getUser()
    setUser(res)
    setAuth(true)
    setLoading(false)
  }

  useEffect(() => {
    verify()
  }, [])

  return (
    <AuthContext.Provider value={{
      auth,
      loading,
      error,
      errorMessage,
      login,
      register,
      logout
    }}>
      <UserProvider user={user}>
        {children}
      </UserProvider>
    </AuthContext.Provider>
  )
}