import { useEffect, useState } from 'react'
import ClientList from '../components/client/ClientList'
import service from '../data/service'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function Client() {

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getClients() {
      setLoading(true)
      try {
        const response = await service.getClientsRequest()
        setClients(response)
      } catch (e) {
        console.log(e)
        setError(true)
      }
    }
    getClients()
  }, [])

  return (
    <div>
      {
        loading
          ? <Loader />
          : error
            ? <ErrorMessage message='Error de servidor' />
            : <ClientList clients={clients} />
      }
    </div>
  )
}

export default Client