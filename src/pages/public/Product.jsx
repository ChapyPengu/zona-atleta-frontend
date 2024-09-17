import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useBuy } from '../../contexts/BuyContext'
import { useUser } from '../../contexts/UserContext'
import ProductService from '../../services/ProductService'
import ShoppingCart from '../../components/icons/ShoppingCart'
import Button from '../../components/Button'
import Utilities from '../../utilities/Utilities'
import Loader from 'react-spinners/ClipLoader'

function ProductCard({ product }) {

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

function Product() {

  const [products, setProducts] = useState([])
  const [nameValue, setNameValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  const [genderValue, setGenderValue] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    async function getProducts() {
      try {
        let name = searchParams.get('name')
        let category = searchParams.get('category')
        let gender = searchParams.get('gender')
        if (name === null) {
          name = undefined
          setNameValue('')
        } else {
          setNameValue(name)
        }
        if (category === null) {
          category = undefined
          setCategoryValue('')
        } else {
          setCategoryValue(category)
        }
        if (gender === null) {
          gender = undefined
          setGenderValue('')
        } else {
          setGenderValue(gender)
        }
        const data = await ProductService.getProductsRequest(0, 20, { name, category, gender })
        console.log(data.results)
        setProducts(data.results)
      } catch (e) {
        console.log(e)
      }
    }
    getProducts()
  }, [searchParams])

  return (
    <div className='max-w-[1536px] mx-auto py-32'>
      <div>
        <p className='text-primary text-4xl font-bold pl-8 uppercase my-8'>resultados para</p>
        {
          nameValue
            ? <p className='text-gray-900/80 text-xl font-medium pl-8 my-2'>Nombre: <span className='italic font-bold'>{nameValue}</span></p>
            : <></>
        }
        {
          categoryValue
            ? <p className='text-gray-900/80 text-xl font-medium pl-8 my-2'>Categoria: <span className='italic font-bold'>{categoryValue}</span></p>
            : <></>
        }
        {
          genderValue
            ? <p className='text-gray-900/80 text-xl font-medium pl-8 my-2'>Genero: <span className='italic font-bold'>{genderValue}</span></p>
            : <></>
        }
      </div>
      <div>
        {
          products.length === 0
            ? <p className='text-center text-2xl text-primary font-bold'>No se encontraron productos</p>
            : <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {
                products.map((p, i) => <ProductCard key={i} product={p} />)
              }
            </div>
        }
      </div>
    </div>
  )
}

export default Product