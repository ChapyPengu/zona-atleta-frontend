import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import OrderService from '../services/OrderService'
import PageLoader from '../components/loader/PageLoader'
import ErrorMessage from '../components/ErrorMessage'
import { useOrderManager } from '../contexts/OrderManager'
import Utilities from '../utilities/Utilities'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function ProductCard({ product }) {
  return (
    <div>
      {product.name}
    </div>
  )
}

function ProductList({ products }) {
  return (
    <div>
      {
        products.map((p, i) => <ProductCard key={i} product={p} />)
      }
    </div>
  )
}

function OrderLayout({ order }) {

  const [state, setState] = useState(order.state)

  const { editOrder } = useOrderManager()

  const allOptions = ['cancelado', 'pendiente', 'confirmado', 'hecho']
  const options = allOptions.filter(option => option !== order.state)

  function handleChange(e) {
    setState(e.target.value)
  }

  async function handleClick() {
    try {
      await editOrder(order, { state })
    } catch(e) {
      console.log(e)
    }
  }


  return (
    <div>
      <p>{order.id}</p>
      <p>{order.paymentMethod}</p>
      <p>{order.paymentId}</p>
      <p>{order.address}</p>
      <p>{order.date}</p>
      <p>{order.state}</p>
      <ProductList products={order.products}/>
      <Link to={`${BACKEND_URL}/api/order/${order.id}/check`}>
        Descargar Factura
      </Link>
      <br />
      <label htmlFor="select-state">Cambiar estado</label>
      <select id='select-state' onChange={handleChange}>
        <option value={order.state}>{order.state}</option>
        {
          options.map((o, i) => <option key={i} value={o}>{o}</option>)
        }        
      </select>
      <button onClick={handleClick}>Confirmar cambios</button>
    </div>
  )
}

function OrderDetails() {

  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    async function getOrderById() {
      setLoading(true)
      try {
        const response = await OrderService.getByIdRequest(id)
        console.log(response)
        setOrder(response)
      } catch (e) {
        console.log(e)
        setError(true)
      }
      setLoading(false)
    }
    getOrderById()
  }, [])

  return (
    <div className='order-details'>
      {
        loading
          ? <PageLoader />
          : error
            ? <ErrorMessage message='Error de servidor' />
            : <OrderLayout order={order}/>
      }
    </div>
  )
}

export default OrderDetails