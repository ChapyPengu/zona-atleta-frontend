import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ClientService from '../services/ClientService'
import OrderList from '../components/order/OrderList'
import PageLoader from '../components/loader/PageLoader'

function Order() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { id } = useParams()
  useEffect(() => {
    async function getOrders() {
      setLoading(true)
      try {
        const orders = await ClientService.getOrders(id)
        setOrders(orders)
      } catch (e) {
        console.log(e)
        setError(true)
      }
      setLoading(false)
    }
    getOrders()
  }, [id])

  return (
    <div>
      {
        loading
          ? <PageLoader />
          : <OrderList orders={orders} />
      }
    </div>
  )
}

export default Order