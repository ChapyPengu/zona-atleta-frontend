import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBuy } from '../../contexts/BuyContext'
import Button from '../Button'
import ShoppingCart from '../icons/ShoppingCart'
import Utilities from '../../utilities/Utilities'
import Loader from '../loader/Loader'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function ProductCard({ product }) {

  const [loadingAdd, setLoadingAdd] = useState(false)
  const [loadingBuy, setLoadingBuy] = useState(false)

  const navigate = useNavigate()
  const { addProduct, buyOne } = useBuy()

  function handleClick(e) {
    e.stopPropagation()
    navigate(`/product/${product.id}`)
  }

  async function handleClickAdd(e) {
    e.stopPropagation()
    if (loadingAdd || loadingBuy) return
    try {
      setLoadingAdd(true)
      await addProduct(product)
      setLoadingAdd(false)
    } catch (e) {
      console.log(e)
    }
  }

  async function handleClickBuy(e) {
    e.stopPropagation()
    if (loadingAdd || loadingBuy) return
    try {
      await buyOne(product)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='product-card' onClick={handleClick}>
      <div className='product-card__image-container'>
        <p className='product-card__more-see'>Ver mas</p>
        {
          product.image !== null
            ? <img className='product-card__image' src={`${BACKEND_URL}${product.image}`} alt={product.name} />
            : <img className='product-card__image' src={Utilities.randomImg()} alt={product.name} />
        }
      </div>
      <div className='product-card__content'>
        <p className='product-card__name'>{product.name}</p>
        <div className='product-card__container'>
          <p className='product-card__price'>${product.price}</p>
        </div>
        <div className='product-card__btn-container'>
          <Button className='' variant='outline' title='Comprar' onClick={handleClickBuy}>
          {
              loadingBuy
                ? <Loader />
                : 'Comprar'
            }
          </Button>
          <Button className='' title='Agregar al carrito' onClick={handleClickAdd}>
            {
              loadingAdd
                ? <Loader />
                : <ShoppingCart />
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

function ProductList({ products }) {
  return (
    <div className='product-list'>
      {
        products.map((p, i) => <ProductCard key={i} product={p} />)
      }
    </div>
  )
}

function ProductsSection({ loading, products }) {
  return (
    <div>
      <ProductList products={products} />
    </div>
  )
}

export default ProductsSection