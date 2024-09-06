import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBuy } from '../../contexts/BuyContext'
import Button from '../Button'
import ShoppingCart from '../icons/ShoppingCart'
import Utilities from '../../utilities/Utilities'
// import Loader from '../loader/Loader'
import Loader from 'react-spinners/ClipLoader'
import { useUser } from '../../contexts/UserContext'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function formatearNumeroConPuntos(numero) {
  // Convertir el número a string
  let numStr = numero.toString();

  // Usar una expresión regular para insertar puntos en los miles
  let resultado = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return resultado;
}

function ProductCard({ product }) {

  const [loadingAdd, setLoadingAdd] = useState(false)
  const [loadingBuy, setLoadingBuy] = useState(false)
  const [hasProduct, setHasProduct] = useState(product.have)

  const navigate = useNavigate()
  const { addProduct, buyOne } = useBuy()
  const user = useUser()

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
      setHasProduct(true)
      user.setNotifications(user.notifications + 1)
    } catch (e) {
      console.log(e)
    }
  }

  async function handleClickBuy(e) {
    e.stopPropagation()
    if (loadingAdd || loadingBuy) return
    try {
      setLoadingBuy(true)
      await buyOne(product)
      setLoadingBuy(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div className='product-card' onClick={handleClick}>
      <div className='product-card__image-container'>
        <p className='product-card__more-see'>Ver mas</p>
        {
          product.image !== null
            ? <img className='product-card__image' src={`${product.image}`} alt={product.name} />
            : <img className='product-card__image' src={Utilities.randomImg()} alt={product.name} />
        }
      </div>
      <div className='product-card__content'>
        <div className='flex items-center justify-between'>
          <p className='product-card__name'>{product.name}</p>
          <p className='product-card__price'>${formatearNumeroConPuntos(product.price)}</p>
        </div>
        <div className='flex justify-start gap-8'>
          {
            hasProduct
              ? <Link to='/shopping-cart' onClick={e => e.stopPropagation()}>
                <Button>
                  <div className='flex items-center gap-4'>Ir al carrito de compras <ShoppingCart /></div>
                </Button>
              </Link>
              : <div className='flex justify-start gap-4'>
                <Button className='' variant='outline' title='Comprar' onClick={handleClickBuy} disabled={loadingAdd || loadingBuy}>
                  {
                    loadingBuy
                      ? <Loader className='loader-color' color='#ed3237' />
                      : 'Comprar'
                  }
                </Button>
                <Button className='' title='Agregar al carrito' onClick={handleClickAdd} disabled={loadingAdd || loadingBuy}>
                  {
                    loadingAdd
                      ? <Loader className='loader-color' color='white' />
                      : <div className='flex items-center gap-4'>Agregar al Carrito <ShoppingCart /></div>
                  }
                </Button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function ProductList({ products }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      {
        products.map((p, i) => <ProductCard key={i} product={p} />)
      }
    </div>
  )
}

function ProductsSection({ title, loading, products }) {
  return (
    <div id='#products'>
      {/* <h4 className='text-4xl font-semibold my-8'>{title}</h4> */}
      <h1 className="pl-8 my-8 text-3xl uppercase font-black bg-gradient-to-r from-primary  to-[#ff9f1a] inline-block text-transparent bg-clip-text">{title}</h1>
      <ProductList products={products} />
    </div>
  )
}

export default ProductsSection