import { Link } from 'react-router-dom'
import ShoppingCartList from '../components/shopping-cart/ShoppingCartList'
import useUser from '../hooks/useUser'
import ErrorMessage from '../components/ErrorMessage'
import Button from '../components/Button'

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

function ShoppingCartDetails({ totalPrice, onClickBuy }) {

  return (
    <div className='shopping-cart-details'>

      <div>
        <p className='shopping-cart-details__total-price'>Total de la Compra</p>
        <p className='shopping-cart-details__total-price'>${totalPrice}</p>
      </div>
      <button className='shopping-cart-details__btn-buy' onClick={onClickBuy}>
        Comprar Ahora
      </button>
    </div>
  )
}

function ShoppingCart() {

  const clientContext = useUser()

  return (
    <div className='shopping-cart'>
      {
        clientContext.shoppingCart.length !== 0
          ? <>
            <ShoppingCartList
              products={clientContext.shoppingCart}
              onClickLessProduct={clientContext.shoppingCartLessAmountProduct}
              onClickMoreProduct={clientContext.shoppingCartMoreAmountProduct}
              onClickDeleteProduct={clientContext.shoppingCartDeleteProduct}
            />
            <ShoppingCartDetails
              totalPrice={clientContext.shoppingCart.reduce((acum, p) => acum + p.price, 0)}
              onClickBuy={clientContext.shoppingCartBuy}
            />
          </>
          : <ShoppinCartVoid />
      }
    </div>
  )
}

export default ShoppingCart