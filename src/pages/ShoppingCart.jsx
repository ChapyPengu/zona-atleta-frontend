import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBuy } from '../contexts/BuyContext'
import Button from '../components/Button'
import ErrorMessage from '../components/ErrorMessage'
import ShoppingCartList from '../components/shopping-cart/ShoppingCartList'
import Loader from '../components/loader/Loader'

function ShoppinCartVoid() {
  return (
    <div className='shopping-cart-details-void'>
      <ErrorMessage message='El carrito de compras esta vacio' />
      <Link to='/home' className='link '>
        <Button>
          Seguir Comprando
        </Button>
      </Link>
    </div>
  )
}

function ShoppingCartDetails() {

  const { products, buy } = useBuy()

  const total = products.reduce((acum, p) => acum + p.price, 0)

  async function handleClick() {
    console.log('Comprando')
    try {
      await buy()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='col-start-3 col-end-4 bg-blue-200 py-8 text-center'>
      <div className='text-center'>
        <p className='text-2xl mb-2'>Total de la Compra</p>
        <p className='text-2xl font-bold'>${total}</p>
      </div>
      <button className='bg-primary text-white px-4 py-2 rounded-md text-xl font-semibold mt-4' onClick={handleClick}>
        Comprar Ahora
      </button>
    </div>
  )
}

function ShoppingCart() {


  const { loading, products, error, message } = useBuy()

  return (
    <div className='shopping-cart page bg-blue-00 max-w-[1536px] mx-auto'>
      {
        loading
          ? <Loader size={64} />
          : products.length === 0
            ? <ShoppinCartVoid />
            : <div className='grid grid-cols-3 items-start'>
              <ShoppingCartList
                products={products}
              />
              <ShoppingCartDetails />
            </div>
      }
    </div>
  )
}

export default ShoppingCart