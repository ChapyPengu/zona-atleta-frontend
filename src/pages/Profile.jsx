import { useEffect } from 'react'
import useUser from '../hooks/useUser'

function Profile() {

  const { username } = useUser()

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <p>{username}</p>
    </div>
  )
}

export default Profile