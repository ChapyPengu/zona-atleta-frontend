import { useEffect, useState } from 'react'
import Provider from '../data/provider/Provider'
import ClientList from '../components/client/ClientList'

function Client() {

  const [clients, setClients] = useState([])

  useEffect(() => {
    setClients(Provider.getClients())
  }, [])

  return (
    <div>
      <ClientList clients={clients} />
    </div>
  )
}

export default Client