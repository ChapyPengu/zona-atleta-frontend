import Button from '../Button'
import ShoppingCart from '../icons/ShoppingCart'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Utilities from '../../utilities/Utilities'

function ProductCard({ product, onClick = () => { }, onClickBuy = () => { }, onClickAddShoppingCart = () => { } }) {

  const { auth } = useAuth()
  const navigate = useNavigate()

  function handleClick(e) {
    e.stopPropagation()
    navigate(`/product/${product.id}`)
  }

  function handleClickBuy(e) {
    e.stopPropagation()
    if (!auth) {
      navigate('/login')
    } else {
      alert('Comprando')
    }
  }

  function handleClickAddShoppingCart(e) {
    e.stopPropagation()
    if (!auth) {
      navigate('/login')
    } else {
      alert('Se agrego al carrito')
    }
  }

  return (
    <div className='product-card' onClick={handleClick}>
      <div className='product-card__image-container'>
        <p className='product-card__more-see'>Ver mas</p>
        {
          product.image === null
            ? <img className='product-card__image' src={Utilities.randomImg()} alt={product.name} />
            : <></>
        }
      </div>
      <div className='product-card__content'>
        <p className='product-card__name'>{product.name}</p>
        <div className='product-card__container'>
          <p className='product-card__category'>{product.category}</p>
          <p className='product-card__price'>${product.price},00</p>
        </div>
        <p className='product-card__description'>{product.description}</p>
        <div className='product-card__btn-container'>
          <p className='product-card__id'>{product.id}</p>
          <Button className='' variant='outline' title='Comprar' onClick={handleClickBuy}>
            Comprar
          </Button>
          <Button className='' title='Agregar al carrito' onClick={handleClickAddShoppingCart}>
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard