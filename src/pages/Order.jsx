import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import OrderService from '../services/OrderService'
import ClientService from '../services/ClientService'
import OrderList from '../components/order/OrderList'
import PageLoader from '../components/loader/PageLoader'

function Order() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const user = useUser()

  useEffect(() => {
    async function getOrders() {
      setLoading(true)
      try {
        if (user.isClient()) {
          const orders = await ClientService.getOrders(user.id)
          setOrders(orders)
        } else if (user.isSalesManager()) {
          const orders = await OrderService.getOrdersRequest()
          setOrders(orders)
        }
      } catch (e) {
        console.log(e)
        setError(true)
      }
      setLoading(false)
    }
    getOrders()
  }, [user])

  if (loading)
    return (
      <div>
        <PageLoader />
      </div>
    )

  if (error)
    return (
      <div>
        <p>Error de servidor</p>
      </div>
    )
  if (user.isClient())
    return (
      <div>
        <p>Eres un cliente</p>
        <div>
          <OrderList orders={orders} />
        </div>
      </div>
    )

  if (user.isSalesManager())
    return (
      <div>
        <p>Eres un jefe de ventas</p>
        <div>
          <OrderList orders={orders} />
        </div>
      </div>
    )

  return (
    <div>
      Eres none
    </div>
  )
}

export default Order