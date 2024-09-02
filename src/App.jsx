import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import OrderDetails from './pages/OrderDetails'
import RouteToHome from './routes/RouteToHome'
import NotFound from './pages/NotFound'
import ProtectedAuth from './routes/ProtectedAuth'
import ProtectedClient from './routes/ProtectedClient'
import ProtectedSalesManager from './routes/ProtectedSalesManager'
import ShoppingCart from './pages/ShoppingCart'
import { useProduct } from './contexts/ProductContext'
import Layout from './layouts/Layout'
import Navbar from './components/Navbar'
import Order from './pages/Order'
import Client from './pages/Client'
import ClientDetails from './pages/ClientDetails'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'

function App() {

  const [navbarActive, setNavbarActive] = useState(true)

  const { name, handleChangeName } = useProduct()

  useEffect(() => {

  }, [])

  return (
    <>
      <Navbar active={navbarActive} inputValue={name} inputOnChange={handleChangeName} />
      <Chatbot />
      <Layout>
        <Routes>
          <Route path='/' element={<RouteToHome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/page/:page' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route element={<ProtectedAuth />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/order' element={<Order />} />
            <Route path='/order/:id' element={<OrderDetails />} />
            <Route element={<ProtectedClient />}>
              <Route path='/shopping-cart' element={<ShoppingCart />} />
            </Route>
            <Route element={<ProtectedSalesManager />}>
              <Route path='/client' element={<Client />} />
              <Route path='/client/:id' element={<ClientDetails />} />
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