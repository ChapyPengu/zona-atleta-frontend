import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loader from '../components/Loader'
import useUser from '../hooks/useUser'
import { PROFILES } from '../config/const'

function ProtectedAuth() {

  const { auth, loading } = useAuth()
  const { type } = useUser()

  if (loading)
    return <div className='home__loading-container'>
      <Loader />
    </div>
    
  if ((!auth) || (type === PROFILES.NONE))
    return <Navigate to='/login' />
  
  return <Outlet />
}

export default ProtectedAuth