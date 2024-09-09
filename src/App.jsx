import { useState } from 'react'
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
import ClientOrders from './pages/ClientOrders'
import Favorites from './pages/Favorites'
import ProductByCategory from './pages/ProductByCategory'
import ProductByName from './pages/ProductByName'
import NotFound from './pages/NotFound'
import Layout from './layouts/Layout'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import Admin from './pages/Admin'

function App() {

  const [navbarActive, setNavbarActive] = useState(true)
  const [name, setName] = useState('')

  return (
    <>
      <Navbar active={navbarActive} inputValue={name} inputOnChange={(e) => setName(e.target.value)} />
      <Chatbot />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          zIndex: '1500'
        }} />
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/page/:page' element={<Home />} />
          <Route path='/category/:name' element={<ProductByCategory />} />
          <Route path='/name/:name' element={<ProductByName />} />
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
              <Route path='/favorites' element={<Favorites />} />
            </Route>
            <Route element={<ProtectedSalesManager />}>
              <Route path='/admin' element={<Admin />} />
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