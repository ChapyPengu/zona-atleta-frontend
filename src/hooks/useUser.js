import { useContext } from 'react'
import { NoneContext } from '../contexts/user/NoneContext'
import { ClientContext } from '../contexts/user/ClientContext'
import { SalesManagerContext } from '../contexts/user/SalesManagerContext'

function useUser() {
  const none = useContext(NoneContext)
  const client = useContext(ClientContext)
  const salesManager = useContext(SalesManagerContext)

  if (none !== undefined) {
    return none
  } else if (client !== undefined) {
    return client
  } else if (salesManager !== undefined) {
    return salesManager
  }
  throw new Error('Profile context not found')
}

export default useUser