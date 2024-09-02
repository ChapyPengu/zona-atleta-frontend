import { useEffect, useState } from 'react'
import OrderList from '../components/order/OrderList'
import useUser from '../hooks/useUser'
import Provider from '../data/provider/Provider'
import { PROFILES } from '../config/const'

function Order() {

  const [orders, setOrders] = useState([])

  const userContext = useUser()

  useEffect(() => {

    if (userContext.type === PROFILES.CLIENT) {
      setOrders(userContext.orders)
    }

    else if (userContext.type === PROFILES.SALES_MANAGER) {
      setOrders(Provider.getOrders())
    }


  }, [userContext])

  if (userContext.type === PROFILES.CLIENT)
    return (
      <div>
        <p>Eres un cliente</p>
        <div>
          <OrderList orders={orders}/>
        </div>
      </div>
    )

  if (userContext.type === PROFILES.SALES_MANAGER)
    return (
      <div>
        <p>Eres un jefe de ventas</p>
        <div>
          <OrderList orders={orders}/>
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