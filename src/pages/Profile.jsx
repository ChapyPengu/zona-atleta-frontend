import { useEffect } from 'react'
import useUser from '../hooks/useUser'
import { PROFILES } from '../config/const'

function ProfileClient({ user }) {
  return (
    <div className='profile'>
      <p className='profile__username'>Bienvenido {user.username}!</p>
      <p>Usted es un buen Cliente</p>
    </div>
  )
}

function ProfileSalesManager({ user }) {
  return (
    <div className='profile'>
      <p className='profile__username'>Bienvenido {user.username}!</p>
      <p>Usted es un buen Jefe de Ventas</p>
    </div>
  )
}

function Profile() {

  const userContext = useUser()

  useEffect(() => {
    
  }, [])

  if (userContext.type === PROFILES.SALES_MANAGER)
    return <ProfileSalesManager user={userContext}/>


  return <ProfileClient user={userContext}/>
}

export default Profile