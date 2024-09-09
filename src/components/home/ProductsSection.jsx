import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBuy } from '../../contexts/BuyContext'
import ShoppingCart from '../icons/ShoppingCart'
import Utilities from '../../utilities/Utilities'
import Loader from 'react-spinners/ClipLoader'
import { useUser } from '../../contexts/UserContext'
import Previus from '../icons/ArrowLeft'
import Next from '../icons/ArrowRight'
import Button from '../Button'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function ProductCard({ product, auth, disabled }) {

  const [loadingAdd, setLoadingAdd] = useState(false)
  const [loadingBuy, setLoadingBuy] = useState(false)
  const [hasProduct, setHasProduct] = useState(product.have)
  const [wantProduct, setWantProduct] = useState(false)
  
  const navigate = useNavigate()
  const { addProduct, buyOne } = useBuy()
  const user = useUser()

  function handleClick(e) {
    e.stopPropagation()
    navigate(`/product/${product.id}`)
  }

  async function handleClickAdd(e) {
    e.stopPropagation()
    if (!auth) {
      navigate('/login')
      return
    }
    if (disabled) {
      return
    }
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
    if (!auth) {
      navigate('/login')
      return
    }
    if (disabled) {
      return
    }
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
        <img className='product-card__image' src={product.image} alt={product.name} />
      </div>
      <div className='product-card__content'>
        <div className='flex items-center justify-between'>
          <p className='product-card__name'>{product.name}</p>
          <p className='product-card__price'>${Utilities.formatNumberToPrice(product.price)}</p>
        </div>
        <div className='flex justify-start gap-8'>
          {
            hasProduct
              ? <Link to='/shopping-cart' onClick={e => e.stopPropagation()}>
                <Button disabled={disabled}>
                  <div className='flex items-center gap-4'>Ir al carrito de compras <ShoppingCart /></div>
                </Button>
              </Link>
              : <div className='flex justify-start gap-4'>
                <Button className='' title='Comprar' onClick={handleClickBuy} disabled={disabled || loadingAdd || loadingBuy}>
                  {
                    loadingBuy
                      ? <Loader className='loader-color' color='white' />
                      : 'Comprar'
                  }
                </Button>
                <Button variant='outline' className='px-0 py-0' title='Agregar al carrito' onClick={handleClickAdd} disabled={disabled || loadingAdd || loadingBuy}>
                  {
                    loadingAdd
                      ? <Loader className='loader-color' color='white' />
                      : <div className='flex items-center gap-4 w-full h-full py-2 px-4'>Agregar al Carrito <ShoppingCart /></div>
                  }
                </Button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

function ProductList({ products, auth, disabled }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      {
        products.map((p, i) => <ProductCard key={i} product={p} auth={auth} disabled={disabled} />)
      }
    </div>
  )
}

function ProductsSection({ title, loading, products, page, navigate }) {

  const user = useUser()

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className="pl-8 my-12 text-3xl uppercase font-black bg-gradient-to-r from-primary  to-[#ff9f1a] inline-block text-transparent bg-clip-text">{title}</h1>
        <div className='flex gap-4'>
          <Button onClick={() => {
            if (page === undefined) {
              navigate(`/home/page/${2}`)
            } else {
              if (parseInt(page) >= 2) {
                navigate(`/home/page/${parseInt(page) - 1}`)
              }
            }
          }}>
            <Previus className='fill-white' />
          </Button>
          {
            page !== undefined
              ? <Button>
                {page}
              </Button>
              : <></>
          }
          <Button onClick={() => {
            if (page === undefined) {
              navigate(`/home/page/${2}`)
            } else {
              navigate(`/home/page/${parseInt(page) + 1}`)
            }
          }}>
            <Next className='fill-white' />
          </Button>
        </div>
      </div>
      <ProductList products={products} auth={!user.isNone()} disabled={user.isSalesManager()}/>
    </div>
  )
}

export default ProductsSection