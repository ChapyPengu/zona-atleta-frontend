import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import ClientService from '../services/ClientService'

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

  const [data, setData] = useState({})

  const user = useUser()

  useEffect(() => {
    setData({})
  }, [])

  if (user.isClient())
    return <ProfileClient user={data} />

  if (user.isSalesManager())
    return <ProfileSalesManager user={data} />


}

export default Profile