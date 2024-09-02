import { useEffect } from "react"
import { useState } from "react"
import { useParams } from 'react-router-dom'
import service from '../data/service'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function OrderDetails() {

  const [order, setOrder] = useState({})
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    async function getOrderById() {
      setLoader(true)
      try {
        const response = await service.getOrderByIdRequest({ id })
        setOrder(response)
      } catch (e) {
        console.log(e)
        setError(true)
      }
      setLoader(false)
    }
    getOrderById()
  }, [])

  return (
    <div className="order-details">
      {
        loader
          ? <Loader />
          : error
            ? <ErrorMessage message='Error de servidor' />
            : <p>{order.id}</p>
      }
    </div>
  )
}

export default OrderDetails