import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedAuth from './routes/ProtectedAuth'
import ProtectedNotAuth from './routes/ProtectedNotAuth'
import ProtectedClient from './routes/ProtectedClient'
import ProtectedSalesManager from './routes/ProtectedSalesManager'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ShoppingCart from './pages/ShoppingCart'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import Order from './pages/Order'
import OrderDetails from './pages/OrderDetails'
import Client from './pages/Client'
import ClientDetails from './pages/ClientDetails'
import CreateProduct from './pages/CreateProduct'
import NotFound from './pages/NotFound'
import Layout from './layouts/Layout'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ClientOrders from './pages/ClientOrders'


function App() {

  const [navbarActive, setNavbarActive] = useState(true)
  const [name, setName] = useState('')

  useEffect(() => {
    // console.log('1')

    // if (document.startViewTransition) {
    // window.navigation.addEventListener('navigation', (event) => {
    //   const toUrl = new URL(event.destination.url)
    //   console.log('1')
    //   if (location.origin !== toUrl.origin) return
    //   console.log('2')

    //   event.intercept({
    //     async handler() {
    //     console.log('3')

    //       const response = await fetch(toUrl.pathname)
    //       const text = await response.text()

    //       const [, data] = text.match(/<body>([\s\S]*)<\/body>/i)

    //       document.startViewTransition(() => {
    //         console.log('hoa')
    //         // document.body.innerHTML = data
    //         document.documentElement.scrollTop = 0
    //       })
    //     }
    //   })
    // })
    // }

    return () => {
      // window.navigation.addEventListener('navigation', () => {

      // })
    }
  }, [])

  return (
    <>
      <Navbar active={navbarActive} inputValue={name} inputOnChange={(e) => setName(e.target.value)} />
      <Chatbot />
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home name={name} />} />
          <Route path='/home/page/:page' element={<Home name={name} />} />
          <Route element={<ProtectedNotAuth />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route element={<ProtectedAuth />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/order' element={<Order />} />
            <Route path='/order/:id' element={<OrderDetails />} />
            <Route element={<ProtectedClient />}>
              <Route path='/shopping-cart' element={<ShoppingCart />} />
            </Route>
            <Route element={<ProtectedSalesManager />}>
              <Route path='/create-product' element={<CreateProduct />} />
              <Route path='/client' element={<Client />} />
              <Route path='/client/:id' element={<ClientDetails />} />
              <Route path='/client/:id/orders' element={<ClientOrders />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound setNavbarActive={setNavbarActive} />} />
        </Routes>
      </Layout>
      <Footer />
    </>
  )
}

export default App