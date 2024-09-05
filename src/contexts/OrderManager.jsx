import { useState, useEffect, useContext, createContext } from 'react'
import { useUser } from './UserContext'
import ClientService from '../services/ClientService'
import OrderService from '../services/OrderService'

const OrderManagerContext = createContext()

export function useOrderManager() {
  const context = useContext(OrderManagerContext)
  if (!context)
    throw new Error('Buy context not found')
  return context
}

export function OrderManagerContextProvider({ children }) {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const user = useUser()

  async function downloadCheck(id) {
    setLoading(true)
    if (loading) return
    try {
      const data = await OrderService.getCheck(id)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  async function addProduct(product) {
    setLoading(true)
    if (!user.isClient()) return
    try {
      const data = await ClientService.postProduct(user.id, product.id, { amount: 1 })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }


  async function deleteProduct(product) {
    setLoading(true)
    if (!user.isClient()) return
    try {
      const data = await ClientService.deleteProduct(user.id, product.id)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }


  async function editOrder(order, { state, address }) {
    setLoading(true)
    try {
      const data = await OrderService.putRequest(order.id, { state, address })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }


  async function buyOne(product) {
    setLoading(true)
    if (!user.isClient()) return
    try {
      const data = await ClientService.postOrderByOneProduct(user.id, product.id, {
        paymentMethod: 'Mercado Pago',
        address: 'Balbin 3219',
        amount: 1
      })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }


  async function buy() {
    setLoading(true)
    if (!user.isClient()) return
    try {
      const data = await ClientService.postOrderByManyProduct(user.id, {
        paymentMethod: 'Mercado Pago',
        address: 'Balbin 3219',
        amount: 1
      })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {

    async function getOrders() {
      setLoading(true)
      if (user.isNone()) return
      try {
        if (user.isClient()) {
          const res = await ClientService.getOrders(user.id)
          setOrders(res)
        console.log(res)

        } else if (user.isSalesManager()) {
          const res = await OrderService.getOrdersRequest()
          setOrders(res)
        console.log(res)
        }
      } catch (e) {
        console.log(e)
        setError(true)
        setMessage(e.response?.data.message)
      }
      setLoading(false)
    }
    getOrders()
  }, [user])

  return (
    <OrderManagerContext.Provider value={{
      orders,
      loading,
      error,
      message,
      downloadCheck,
      editOrder,
      addProduct,
      deleteProduct,
      buyOne,
      buy
    }}>
      {children}
    </OrderManagerContext.Provider>
  )
}