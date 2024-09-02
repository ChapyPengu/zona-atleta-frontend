import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser'
import Notification from './user/Notification'
import ProductFilterName from './product/ProductFilterName'
import Logo from './Logo'
import User from './icons/User'
import ShoppingCart from './icons/ShoppingCart'
import Bars from './icons/Bars'
import Xmark from './icons/Xmark'
import ArrowLeft from './icons/ArrowLeft'
import { PROFILES } from '../config/const'
import OrderClient from './icons/OrderClient'
import OrderSalesManager from './icons/OrderSalesManager'
import Users from './icons/Users'

const NONE_LINKS = []

const CLIENT_LINKS = [
  {
    name: 'Pedidos',
    to: '/order',
    icon: <OrderClient />
  },
  {
    name: 'Carrito de Compras',
    to: '/shopping-cart',
    icon: <ShoppingCart />
  }
]

const SALES_MANAGER_LINKS = [
  {
    name: 'Pedidos',
    to: '/order',
    icon: <OrderSalesManager />
  },
  {
    name: 'Clientes',
    to: '/client',
    icon: <Users />
  }
]

const NONE_OPTIONS = [
  {
    name: 'Iniciar Sesion',
    to: '/login'
  },
  {
    name: 'Crear Cuenta',
    to: '/register'
  }
]

const CLIENT_OPTIONS = [
  {
    name: 'Cuenta',
    to: '/profile'
  },
  {
    name: 'Cerrar Sesion',
    to: '/logout'
  }
]

const SALES_MANAGER_OPTIONS = [
  {
    name: 'Cuenta',
    to: '/profile'
  },
  {
    name: 'Cerrar Sesion',
    to: '/logout'
  }
]

function NavbarBase({ userOptions, links, inputValue, inputOnChange }) {
  return (
    <div className='navbar-content'>
      <Logo />
      <ProductFilterName value={inputValue} onChange={inputOnChange} />
      <div className='navbar-content__icons'>
        <div className='navbar-content__icon'>
          <button className='navbar-content-btn-icon navbar-account'>
            <User className='navbar-content-icon' />
          </button>
          <div className='navbar-content__menu'>
            {
              userOptions.map((item, i) => <Link key={i} className='link navbar-content__menu-item' to={item.to}>{item.name}</Link>)
            }
          </div>
        </div>
        {
          links.map((item, i) => <Link key={i} to={item.to} className='link navbar-content-btn-icon'>{item.icon}</Link>)
        }
      </div>
    </div>
  )
}

function NavbarResponsive({ userOptions, links, inputValue, inputOnChange, search, setSearch, menu, setMenu }) {
  return (
    <div className='navbar-responsive'>
      <div className='navbar-responsive__header'>
        <Logo />
        <div className='navbar-responsive__control'>
          {
            search
              ? <button className='navbar-responsive-btn' onClick={() => setSearch(!search)}>
                <ArrowLeft />
              </button>
              : <></>
          }
          {
            <button className='navbar-responsive-btn' onClick={() => setMenu(!menu)}>
              {
                menu
                  ? <Xmark />
                  : <Bars />
              }
            </button>
          }
        </div>
      </div>
      {
        search
          ? <div className='navbar-responsive__search'>
            <ProductFilterName value={inputValue} onChange={inputOnChange} />
          </div>
          : menu
            ? <div className='navbar-responsive__menu'>
              <p className='link navbar-responsive__item' onClick={() => setSearch(!search)}>Buscar</p>
              <p className='link navbar-responsive__item' onClick={() => setSearch(!search)}>Usuario</p>
              {
                links.map((item, i) => <Link to={item.to} className='link navbar-responsive__item'>{item.name}</Link>)
              }
            </div>
            : <></>
      }
    </div>
  )
}

function NavbarComponent({ userOptions, links, inputValue, inputOnChange, menu, setMenu, search, setSearch }) {

  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <NavbarBase userOptions={userOptions} links={links} inputValue={inputValue} inputOnChange={inputOnChange} />
        <NavbarResponsive userOptions={userOptions} links={links} inputValue={inputValue} inputOnChange={inputOnChange} menu={menu} setMenu={setMenu} search={search} setSearch={setSearch} />
      </div>
    </div>
  )
}

function Navbar({ active, inputValue, inputOnChange }) {

  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)

  const { type } = useUser()

  useEffect(() => {
    setSearch(false)
  }, [menu])

  if (!active)
    return (
      <div className='navbar'>
        <div className='navbar-container'>
          <div className='navbar-content'>
            <Logo />
          </div>
          <div className='navbar-responsive'>
            <div className='navbar-responsive__header'>
              <Logo />
            </div>
          </div>
        </div>
      </div>
    )

  if (type === PROFILES.SALES_MANAGER)
    return <NavbarComponent userOptions={SALES_MANAGER_OPTIONS} links={SALES_MANAGER_LINKS} inputValue={inputValue} inputOnChange={inputOnChange} menu={menu} setMenu={setMenu} search={search} setSearch={setSearch} />

  if (type === PROFILES.CLIENT)
    return <NavbarComponent userOptions={CLIENT_OPTIONS} links={CLIENT_LINKS} inputValue={inputValue} inputOnChange={inputOnChange} menu={menu} setMenu={setMenu} search={search} setSearch={setSearch} />

  return <NavbarComponent userOptions={NONE_OPTIONS} links={NONE_LINKS} inputValue={inputValue} inputOnChange={inputOnChange} menu={menu} setMenu={setMenu} search={search} setSearch={setSearch} />

}

export default Navbar