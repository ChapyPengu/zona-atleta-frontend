import { Outlet, Navigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import { PROFILES } from '../config/const'

function ProtectedSalesManager() {
  const userContext = useUser()

  if (userContext.type === PROFILES.SALES_MANAGER)
    return <Outlet />

  if (userContext.type === PROFILES.NONE)
    return <Navigate to='/login' />

  return <Navigate to='/home' />
}

export default ProtectedSalesManager