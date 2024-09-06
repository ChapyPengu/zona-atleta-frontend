// import { useState, useContext, createContext, useEffect } from 'react'
// import io from 'socket.io-client'

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// const socket = io(BACKEND_URL)

// const AppContext = createContext()

// export function useNavbar() {
//   const context = useContext(AppContext)
//   if (!context)
//     throw new Error('App context not found')
//   return context
// }

// export function NavbarContextProvider({ children }) {

//   const [name, setName] = useState('')

//   // useEffect(() => {
//   //   socket.on('notification', notification => {
//   //     console.log(notification)
//   //   })
//   // }, [])

//   return (
//     <AppContext.Provider value={{
//       name
//     }}>
//       {children}
//     </AppContext.Provider>
//   )
// }