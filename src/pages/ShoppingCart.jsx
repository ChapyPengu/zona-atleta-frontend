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
    <div className='shopping-cart-details'>

      <div>
        <p className='shopping-cart-details__total-price'>Total de la Compra</p>
        <p className='shopping-cart-details__total-price'>${total}</p>
      </div>
      <button className='shopping-cart-details__btn-buy' onClick={handleClick}>
        Comprar Ahora
      </button>
    </div>
  )
}

function ShoppingCart() {


  const { loading, products, error, message } = useBuy()

  return (
    <div className='shopping-cart'>
      {
        loading
          ? <Loader size={64} />
          : products.length === 0
            ? <ShoppinCartVoid />
            : <>
              <ShoppingCartList
                products={products}
              />
              <ShoppingCartDetails
              />
            </>
      }
    </div>
  )
}

export default ShoppingCart