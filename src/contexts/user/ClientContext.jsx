import { useState, useEffect, createContext } from 'react'

export const ClientContext = createContext()

export function ClientContextProvider({ user, type: profileType, children }) {

  const [id, setId] = useState(0)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [shoppingCart, setShoppingCart] = useState([])
  const [orders, setOrders] = useState([])
  const [profile, setProfile] = useState('')
  const [type, setType] = useState(profileType)

  function productBuy(product) {
    alert('Comprando')
  }

  function shoppingCartAddProduct(product, amount) {
    setShoppingCart([...shoppingCart.push({ ...product, amount })])
  }

  function shoppingCartDeleteProduct(product) {
    setShoppingCart(shoppingCart.filter(p => p.id !== product.id))
  }

  function shoppingCartMoreAmountProduct(product) {
    shoppingCart.find(p => p.id === product.id).amount += 1
    setShoppingCart([...shoppingCart])
  }

  function shoppingCartLessAmountProduct(product) {
    shoppingCart.find(p => p.id === product.id).amount -= 1
    setShoppingCart([...shoppingCart])
  }

  function cancelOrder(order) {

  }

  function updateOrder(order) {

  }

  function shoppingCartBuy() {
    if (shoppingCart !== null) {
      alert('Comprando')
      setShoppingCart([])
    }
  }

  useEffect(() => {
    setId(user.id)
    setUsername(user.username)
    setEmail(user.email)
    setShoppingCart(user.shoppingCart.products)
    setOrders(user.orders)
    setProfile(user.profile.name)
  }, [user])

  return (
    <ClientContext.Provider value={{
      id,
      username,
      email,
      shoppingCart,
      profile,
      orders,
      type,
      productBuy,
      shoppingCartAddProduct,
      shoppingCartBuy,
      shoppingCartDeleteProduct,
      shoppingCartLessAmountProduct,
      shoppingCartMoreAmountProduct,
      cancelOrder,
      updateOrder
    }}>
      {children}
    </ClientContext.Provider>
  )
}