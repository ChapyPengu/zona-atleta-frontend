import { Outlet, Navigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import { PROFILES } from '../config/const'

function ProtectedClient() {

  const userContext = useUser()

  if (userContext.type === PROFILES.CLIENT)
    return <Outlet />

  if (userContext.type === PROFILES.NONE)
    return <Navigate to='/login' />

  return <Navigate to='/home' />
}

export default ProtectedClient