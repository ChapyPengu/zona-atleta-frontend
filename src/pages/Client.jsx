import { useState, useEffect } from 'react'
import ClientService from '../services/ClientService'
import ClientList from '../components/client/ClientList'
import PageLoader from '../components/loader/PageLoader'
import ErrorMessage from '../components/ErrorMessage'

function Client() {

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getClients() {
      setLoading(true)
      try {
        const response = await ClientService.getAllRequest()
        setClients(response)
      } catch (e) {
        console.log(e)
        setError(true)
      }
      setLoading(false)
    }
    getClients()
  }, [])

  return (
    <div>
      {
        loading
          ? <PageLoader />
          : error
            ? <ErrorMessage message='Error de servidor' />
            : <ClientList clients={clients} />
      }
    </div>
  )
}

export default Client