import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import Logo from './Logo'
import ProductFilterName from './product/ProductFilterName'
import User from './icons/User'
import ShoppingCart from './icons/ShoppingCart'
import Bars from './icons/Bars'
import Xmark from './icons/Xmark'
import ArrowLeft from './icons/ArrowLeft'
import OrderClient from './icons/OrderClient'
import OrderSalesManager from './icons/OrderSalesManager'
import Users from './icons/Users'
import Like from './icons/Like'
import Bell from './icons/Bell'
import ClientService from '../services/ClientService'
import Search from './icons/Search'

const NONE_LINKS = [
  {
    name: 'Favoritos',
    to: '/favorites',
    icon: <Like />
  },
  {
    name: 'Carrito de Compras',
    to: '/shopping-cart',
    icon: <ShoppingCart />
  }
]

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

function NavbarBase({ userOptions, links, inputValue, inputOnChange, logout }) {

  const [notifications, setNotifications] = useState([])

  const navigate = useNavigate()

  const user = useUser()

  useEffect(() => {
    async function getNotifications() {
      if (user.isClient()) {
        try {
          const data = await ClientService.getNotifications(user.id)
          console.log(data)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }, [])

  return (
    <div className='navbar-content'>
      <div className='flex items-center gap-4 justify-center'>
        {/* <Bars className='bars-icon-navbar' /> */}
        <Logo />
      </div>
      <div className='flex gap-4 font-bold'>
        <p className='capitalize hover:underline cursor-pointer'>categorias</p>
        <p className='capitalize hover:underline cursor-pointer'>mujer</p>
        <p className='capitalize hover:underline cursor-pointer'>hombre</p>
        <p className='capitalize hover:underline cursor-pointer'>kid</p>
        <p className='capitalize hover:underline cursor-pointer'>categorias</p>
        <p className='capitalize hover:underline cursor-pointer'>marcas</p>
        <p className='capitalize hover:underline cursor-pointer'>zapatillas</p>
      </div>
      {/* <ProductFilterName value={inputValue} onChange={inputOnChange} /> */}
      <div className='navbar-content__icons'>
        <p className='link navbar-content-btn-icon'>
          <Search />
        </p>
        <div className='navbar-content__icon'>
          <button className='navbar-content-btn-icon navbar-account'>
            <User className='navbar-content-icon' />
          </button>
          <div className='navbar-content__menu'>
            {
              userOptions.map((item, i) => {
                if (item.to === '/logout') {
                  return <p key={i} className='link navbar-content__menu-item ' onClick={async () => {
                    try {
                      await logout()
                      navigate('/home')
                    } catch (e) {
                      console.log(e)
                    }
                  }}>{item.name}</p>
                } else {
                  return <Link key={i} className='link navbar-content__menu-item ' to={item.to}>{item.name}</Link>
                }
              })
            }
          </div>
        </div>
        <div className='navbar-content__icon'>
          <button className='navbar-content-btn-icon navbar-account notification'>
            <Bell className='navbar-content-icon' />
            <p className='notification-number'>1</p>
          </button>
          <div className='navbar-content__menu navbar-content__menu-2'>
            {
              notifications.map((n, i) => <p key={i} className='link navbar-content__menu-item'>{n.message}</p>)
            }
          </div>
        </div>
        {
          links.map((item, i) => {
            if (item.name === 'Carrito de Compras') {
              return <Link to={item.to} key={i} onClick={e => e.stopPropagation()}>
                <button  onClick={(e) => e.stopPropagation()} className='navbar-content-btn-icon navbar-account notification'>
                  <ShoppingCart className='navbar-content-icon' />
                  {
                    user.notifications !== 0
                      ? <p className='notification-number'>{user.notifications}</p>
                      : <></>
                  }
                </button>
              </Link>
            }
            return <Link key={i} to={item.to} className='link navbar-content-btn-icon'>{item.icon}</Link>
          })
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
                links.map((item, i) => <Link key={i} to={item.to} className='link navbar-responsive__item'>{item.name}</Link>)
              }
            </div>
            : <></>
      }
    </div>
  )
}

function NavbarComponent({ userOptions, links, inputValue, inputOnChange, menu, setMenu, search, setSearch, logout }) {

  return (
    <div className='navbar bg-primary'>
      <div className='navbar-container'>
        <NavbarBase userOptions={userOptions} links={links} inputValue={inputValue} inputOnChange={inputOnChange} logout={logout} />
        <NavbarResponsive userOptions={userOptions} links={links} inputValue={inputValue} inputOnChange={inputOnChange} menu={menu} setMenu={setMenu} search={search} setSearch={setSearch} />
      </div>
    </div>
  )
}

function Navbar({ active, inputValue, inputOnChange }) {

  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)

  const user = useUser()

  const props = {
    inputValue,
    inputOnChange,
    menu,
    setMenu,
    search,
    setSearch,
    logout: user.logout
  }

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

  if (user.isClient())
    return <NavbarComponent
      userOptions={CLIENT_OPTIONS}
      links={CLIENT_LINKS}
      {...props}
    />

  if (user.isSalesManager())
    return <NavbarComponent
      userOptions={SALES_MANAGER_OPTIONS}
      links={SALES_MANAGER_LINKS}
      {...props}
    />

  return <NavbarComponent
    userOptions={NONE_OPTIONS}
    links={NONE_LINKS}
    {...props}
  />

}

export default Navbar