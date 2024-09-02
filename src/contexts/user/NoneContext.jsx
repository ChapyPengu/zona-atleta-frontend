import { useState, useEffect, createContext } from 'react'

export const NoneContext = createContext()

export function NoneContextProvider({ user, type: profileType, children }) {

  const [type, setType] = useState(profileType)

  useEffect(() => {

  }, [])

  return (
    <NoneContext.Provider value={{
      type
    }}>
      {children}
    </NoneContext.Provider>
  )
}