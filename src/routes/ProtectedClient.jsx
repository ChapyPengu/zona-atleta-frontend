import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import PageLoader from '../components/loader/PageLoader'

function ProtectedClient() {

  const user = useUser()

  if (user.isLoading())
    return <PageLoader />

  if (user.isNone())
    return <Navigate to='/login' />

  if (user.isSalesManager())
    return <Navigate to='/home' />

  return <Outlet />
}

export default ProtectedClient