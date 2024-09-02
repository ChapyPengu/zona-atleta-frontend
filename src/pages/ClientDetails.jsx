import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import service from '../data/service'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function ClientDetails() {

  const [client, setClient] = useState({})
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    async function getClient() {
      setLoader(true)
      try {
        const res = service.getClientById({ id })
        setClient(res)
      } catch (e) {
        setError(true)
      }
      setLoader(false)
    }
    getClient()
  }, [])

  return (
    <div className='client-details'>
      {
        loader
          ? <Loader />
          : error
            ? <ErrorMessage message='Error de servidor' />
            : <p>Este es el perfil de {client.username}</p>
      }
    </div>
  )
}

export default ClientDetails