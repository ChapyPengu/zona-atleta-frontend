import { Link } from 'react-router-dom'
import ShoppingCartList from '../components/shopping-cart/ShoppingCartList'
import useUser from '../hooks/useUser'
import ErrorMessage from '../components/ErrorMessage'
import Button from '../components/Button'

function ShoppingCartDetails({ totalPrice, onClickBuy }) {

  if (totalPrice !== 0)
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

  return (
    <div className='shopping-cart-details'>
      <Link to='/home' className='link '>
        <Button>
          Seguir Comprando
        </Button>
      </Link>
    </div>
  )
}

function ShoppingCart() {

  const clientContext = useUser()

  return (
    <div className='shopping-cart'>
      {
        clientContext.shoppingCart !== null
          ? <>
            {
              clientContext.shoppingCart.length !== 0
                ? <ShoppingCartList
                  products={clientContext.shoppingCart}
                  onClickLessProduct={clientContext.shoppingCartLessAmountProduct}
                  onClickMoreProduct={clientContext.shoppingCartMoreAmountProduct}
                  onClickDeleteProduct={clientContext.shoppingCartDeleteProduct}
                />
                : <ErrorMessage message='El carrito de compras esta vacio' />
            }
            <ShoppingCartDetails
              totalPrice={clientContext.shoppingCart.reduce((acum, p) => acum + p.price, 0)}
              onClickBuy={clientContext.shoppingCartBuy}
            />
          </>
          : <></>
      }
    </div>
  )
}

export default ShoppingCart