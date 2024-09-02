import { useState, useEffect, createContext } from 'react'

export const SalesManagerContext = createContext()

export function SalesManagerContextProvider({ user, type: profileType, children }) {

  const [id, setId] = useState(0)
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState('')
  const [type, setType] = useState(profileType)

  function createProduct(product) {

  }

  function updateProduct(product) {

  }

  function deleteProduct(product) {

  }

  function cancelOrder(order) {

  }

  function confirmOrder(order) {

  }

  function downloadCheck(order) {

  }

  useEffect(() => {
    setId(user.id)
    setUsername(user.username)
    setProfile(user.profile.name)
  }, [])

  return (
    <SalesManagerContext.Provider value={{
      id,
      username,
      profile,
      type,
      createProduct,
      updateProduct,
      deleteProduct,
      cancelOrder,
      confirmOrder,
      downloadCheck
    }}>
      {children}
    </SalesManagerContext.Provider>
  )
}