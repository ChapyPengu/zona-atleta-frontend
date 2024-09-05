import { useState, useContext, createContext, useEffect } from 'react'
import { useUser } from './UserContext'
import ClientService from '../services/ClientService'

const BuyContext = createContext()

export function useBuy() {
  const context = useContext(BuyContext)
  if (!context)
    throw new Error('Buy context not found')
  return context
}

export function BuyContextProvider({ children }) {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const user = useUser()

  async function addProduct(product) {
    setLoading(true)
    if (!user.isClient()) return
    const data = await ClientService.postProduct(user.id, product.id, { amount: 1 })
    console.log(data)
    setLoading(false)
  }


  async function deleteProduct(product) {
    setLoading(true)
    if (!user.isClient()) return
    const data = await ClientService.deleteProduct(user.id, product.id)
    console.log(data)
    setLoading(false)
  }


  async function editProduct(product, { amount }) {
    setLoading(true)
    if (!user.isClient()) return
    const data = await ClientService.putProduct(user.id, product.id, { amount })
    console.log(data)
    setLoading(false)
  }


  async function buyOne(product) {
    setLoading(true)
    if (!user.isClient()) return
    const data = await ClientService.postOrderByOneProduct(user.id, product.id, {
      paymentMethod: 'Mercado Pago',
      address: 'Balbin 3219',
      amount: 1
    })
    console.log(data)
    setLoading(false)
  }


  async function buy() {
    setLoading(true)
    if (!user.isClient()) return
    const data = await ClientService.postOrderByManyProduct(user.id, {
      paymentMethod: 'Mercado Pago',
      address: 'Balbin 3219',
      amount: 1
    })
    console.log(data)
    setLoading(false)
  }

  useEffect(() => {

    async function getProducts() {
      setLoading(true)
      if (!user.isClient()) return
      try {
        const res = await ClientService.getProducts(user.id)
        setProducts(res)
      } catch (e) {
        console.log(e)
        setError(true)
        setMessage(e.response?.data.message)
      }
      setLoading(false)
    }
    getProducts()
  }, [user])

  return (
    <BuyContext.Provider value={{
      products,
      loading,
      error,
      message,
      addProduct,
      deleteProduct,
      editProduct,
      buyOne,
      buy
    }}>
      {children}
    </BuyContext.Provider>
  )
}