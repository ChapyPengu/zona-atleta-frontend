import { useState, useEffect, createContext, useContext } from 'react'
import { useApp } from './AppContext'
import AuthService from '../services/AuthService'
import Cookies from 'js-cookie'

const PROFILES = {
  CLIENT: {
    id: 1,
    name: 'none',
  },
  SALES_MANAGER: {
    id: 2,
    name: 'sales manager'
  }
}

const UserContext = createContext()

export function useUser() {
  const context = useContext(UserContext)
  if (!context)
    throw new Error('User context not found')
  return context
}

export function UserContextProvider({ children }) {

  const [id, setId] = useState(0)
  const [notifications, setNotifications] = useState(0)
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)

  const { socket } = useApp()

  function isLoading() {
    return loading
  }

  function isNone() {
    return profile.id === undefined
  }

  function isClient() {
    return profile.id === PROFILES.CLIENT.id

  }

  function isSalesManager() {
    return profile.id === PROFILES.SALES_MANAGER.id
  }

  async function login({ username, password }) {
    const res = await AuthService.postLoginRequest({ username, password })
    setId(res.id)
    setProfile(res.profile)
  }

  async function loginSalesManager({ username, password }) {
    const res = await AuthService.postLoginSalesManagerRequest({ username, password })
    setId(res.id)
    setProfile(res.profile)
  }

  async function register({ username, email, password, passwordRepeat }) {
    const res = await AuthService.postRegisterRequest({ username, email, password, passwordRepeat })
    setId(res.id)
    setProfile(res.profile)
  }

  async function logout() {
    await AuthService.postLogoutRequest()
    setId(0)
    setProfile({})
  }

  async function verify() {
    setLoading(true)
    const cookies = Cookies.get()
    console.log('cookies', cookies)
    if (!cookies.token) return setLoading(false)
    try {
      const res = await AuthService.postVerifyRequest()
      setId(res.id)
      setProfile(res.profile)
      socket.emit('auth', res)
      console.log('verify devuelve', res)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    verify()
  }, [])

  return (
    <UserContext.Provider value={{
      id,
      isLoading,
      isNone,
      isClient,
      isSalesManager,
      login,
      loginSalesManager,
      register,
      logout,
      notifications,
      setNotifications
    }}>
      {children}
    </UserContext.Provider>
  )
}