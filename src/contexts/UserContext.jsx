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
  const [username, setUsername] = useState('')
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

  function setUser(user) {
    setId(user.id)
    setProfile(user.profile)
    setUsername(user.username)
  }

  function resetUser() {
    setId(0)
    setProfile({})
    setUsername('')
  }

  async function login({ username, password }) {
    const user = await AuthService.postLoginRequest({ username, password })
    setUser(user)
    localStorage.setItem('token', JSON.stringify(user))
  }
  

  async function loginSalesManager({ username, password }) {
    const user = await AuthService.postLoginSalesManagerRequest({ username, password })
    setUser(user)
    localStorage.setItem('token', JSON.stringify(user))
  }

  async function googleLogin(credentials) {
    const user = await AuthService.postGoogleLoginRequest(credentials)
    setUser(user)
    localStorage.setItem('token', JSON.stringify(user))
  }

  async function register({ username, email, password }) {
    const user = await AuthService.postRegisterRequest({ username, email, password })
    setUser(user)
    localStorage.setItem('token', JSON.stringify(user))
  }

  async function registerSalesManager({ username, password }) {
    const user = await AuthService.postRegisterSalesManagerRequest({ username, password })
    setUser(user)
    localStorage.setItem('token', JSON.stringify(user))
  }

  async function logout() {
    await AuthService.postLogoutRequest()
    resetUser()
    localStorage.removeItem('token')
  }

  async function verify() {
    setLoading(true)
    // const cookies = Cookies.get()
    // console.log('cookies', cookies)
    // if (!cookies.token) return setLoading(false)
    const token = JSON.parse(localStorage.getItem('token'))
    // console.log('token default', token)
    if (token === null) return setLoading(false)
    // console.log('token default', token)
    if (token.id === undefined) return setLoading(false)
    try {
      // const res = await AuthService.postVerifyRequest()
      const user = token
      setUser(user)
      // socket.emit('auth', res)
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
      username,
      isLoading,
      isNone,
      isClient,
      isSalesManager,
      login,
      loginSalesManager,
      register,
      registerSalesManager,
      logout,
      notifications,
      setNotifications
    }}>
      {children}
    </UserContext.Provider>
  )
}