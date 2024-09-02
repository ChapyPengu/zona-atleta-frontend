import { useEffect, useState } from 'react'
import OrderList from '../components/order/OrderList'
import useUser from '../hooks/useUser'
import service from '../data/service'
import { PROFILES } from '../config/const'
import Loader from '../components/Loader'

function Order() {

  const [orders, setOrders] = useState([])
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState(false)

  const userContext = useUser()

  useEffect(() => {
    async function getOrders() {
      setLoader(true)
      try {
        if (userContext.type === PROFILES.CLIENT) {
          setOrders(await service.getOrdersOfClientByIdRequest({ id: userContext.id }))
        } else if (userContext.type === PROFILES.SALES_MANAGER) {
          setOrders(await service.getOrdersRequest())
        }
      } catch (e) {
        console.log(e)
        setError(true)
      }
      setLoader(false)
    }
    getOrders()
  }, [userContext])

  if (loader)
    return (
      <div>
        <Loader />
      </div>
    )

  if (error)
    return (
      <div>
        <p>Error de servidor</p>
      </div>
    )
  if (userContext.type === PROFILES.CLIENT)
    return (
      <div>
        <p>Eres un cliente</p>
        <div>
          <OrderList orders={orders} />
        </div>
      </div>
    )

  if (userContext.type === PROFILES.SALES_MANAGER)
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
      No eres nadie
    </div>
  )
}

export default Order