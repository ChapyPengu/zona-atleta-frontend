import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import OrderService from '../services/OrderService'
import ClientService from '../services/ClientService'
import PageLoader from '../components/loader/PageLoader'
import { Link } from 'react-router-dom'


function getColorByOrderState(state) {
  return {
    anulado: 'cancel',
    pendiente: 'wait',
    confirmado: 'confirmed',
    hecho: 'ready'
  }[state]
}


function OrderCard({ order }) {
  return (
    <div className="min-h-48 px-8 py-4 text-lg  rounded-md text-white text-center flex justify-center items-center flex-col gap-2 bg-gradient-to-tr from-primary  to-[#ff9f1a]">
      <p>Numero de Pedido: {order.id}</p>
      <p className={`text-sm font-bold uppercase order-card__state-${getColorByOrderState(order.state)} py-1 px-4 block bg-zinc-800 rounded-md`}>{order.state}</p>
      <Link className='font-black hover:underline' to={`/order/${order.id}`}>
        Ver detalles
      </Link>
    </div>
  )
}

function OrderList({ orders }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {
        orders.map((o, i) => <OrderCard key={i} order={o} />)
      }
    </div>
  )
}

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

  if (user.isNone())
    return (
      <div>
        none
      </div>
    )

  return (
    <div className='max-w-[1536px] mx-auto py-16'>
      <div className='grid grid-cols-2 lg:grid-cols-3'>
        <div className='lg:col-start-1 lg:col-end-3'>
          <h1 className="pl-8 my-8 text-3xl uppercase font-black bg-gradient-to-r from-primary  to-[#ff9f1a] inline-block text-transparent bg-clip-text">Pedidos realizados</h1>
          <div>
            <OrderList orders={orders} />
          </div>
        </div>
        <div>
          <h1 className="pl-8 my-8 text-3xl uppercase font-black bg-gradient-to-r from-primary  to-[#ff9f1a] inline-block text-transparent bg-clip-text text-center w-full">Flitrar</h1>
        </div>
      </div>
    </div>
  )
}

export default Order