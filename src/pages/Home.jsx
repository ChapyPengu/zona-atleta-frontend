import { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import ProductService from '../services/ProductService'
import CategoryService from '../services/CategoryService'
import ClientService from '../services/ClientService'


import Header from '../components/home/Header'
import CategoriesSection from '../components/home/CategoriesSection'
import ProductsSection from '../components/home/ProductsSection'
import DiscountSection from '../components/home/DiscountSection'
import LatestAdditions from '../components/home/LatestAdditions'
import PopularProductsSection from '../components/home/PopularProductsSection'
import Button from '../components/Button'

function Home({ name }) {

  const [products, setProducts] = useState([])
  const [discount, setDiscount] = useState([])
  const [categories, setCategories] = useState([])
  const [popular, setPopular] = useState([])
  const [last, setLast] = useState([])
  const [images, setImages] = useState([])

  // const [categories, setCategories] = useState([])
  // const [loanding, setLoading] = useState(false)
  // const [filter, setFilter] = useState(false) // Realmente no significa nada solo se cambia
  // const [order, setOrder] = useState('relevant')
  // const [start, setStart] = useState('')
  // const [end, setEnd] = useState('')
  // const [category, setCategory] = useState('')
  // const [error, setError] = useState(false)
  // const [message, setMessage] = useState('')

  const { page } = useParams()

  const navigate = useNavigate()

  let offset = 15
  let index = (page - 1) * offset

  // async function onClickCard(product) {
  //   return navigate(`/product/${product.id}`)
  // }

  // async function onClickAdd(product) {
  //   try {
  //     if (user.isNone())
  //       return navigate('/login')
  //     if (user.isClient())
  //       await ClientService.postProduct(user.id, product.id, { amount: 1 })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // async function onClickBuy(product) {
  //   try {
  //     if (user.isNone())
  //       return navigate('/login')
  //     if (user.isClient())
  //       await ClientService.postProduct(user.id, product.id, { amount: 1 })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  function getHandleChangeCategory(category) {
    return () => {
      handleChangeCategory(category)
      setScreen(false)
    }
  }

  function handleClickInputPrice(e) {
    e.preventDefault()
    const input = e.target
    const end = input.value.length
    input.setSelectionRange(1, end)
  }

  // function handleChangeOrder(e) {
  //   const value = e.target.value
  //   setOrder(value)
  //   if (value === 'plus') {
  //     products.sort((a, b) => b.price - a.price)
  //   } else if (value === 'minus') {
  //     products.sort((a, b) => a.price - b.price)
  //   }
  //   setProducts([...products])
  // }

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await ProductService.getProductsRequest()
        setProducts(products)
      } catch (e) {
        // console.log(e)
      }
    }

    async function getCategories() {
      try {
        const categories = await CategoryService.getCategoriesRequest()
        if (categories.length >= 6) {
          setCategories(categories.slice(0, 6))
        } else {
          setCategories(categories)
        }
      } catch (e) {
        // console.log(e)
      }
    }

    async function getDiscounts() {
      try {
        // const discount = await ProductService.getProductsRequest()
        // setDiscount(discount)
      } catch (e) {
        // console.log(e)
      }
    }

    async function getLasts() {
      try {
        // const last = await ProductService.getProductsRequest()
        // setLast(last)
      } catch (e) {
        // console.log(e)
      }
    }
    async function getPopular() {
      try {
        // const popular = await ProductService.getProductsRequest()
        // setPopular(popular)
      } catch (e) {
        // console.log(e)
      }
    }

    async function getImages() {
      try {
        // const images = await ProductService.getProductsRequest()
        // setImages(images)
      } catch (e) {
        // console.log(e)
      }
    }
    getProducts()
    getCategories()
    getDiscounts()
    getPopular()
    getLasts()
    getImages()
  }, [])

  return (
    <div className='home'>
      <Header images={images} />
      <Link to='/create-product'>
        <Button>Crear productos</Button>
      </Link>
      <DiscountSection discounts={discount} />
      <CategoriesSection categories={categories} />
      <LatestAdditions last={last} />
      <ProductsSection products={products} />
      <PopularProductsSection popular={popular} />
      {/* <div>
        <CategoriesCarrousel categories={categories} />
      </div> */}
      {/* <div className='home__products'>
        <ProductNextPage />
        <div className='product-filters'>
          <div className='product-filter'>
            <ProductFilterPrice start={start} end={end} error={error} onChangeMinus={handleChangeMinusPrice} onChangePlus={handleChangePlusPrice} onClick={handleClickInputPrice} />
          </div>
          <div className='product-filter'>
            <Button onClick={handleClick}>{category !== '' ? category : 'Categorias'}</Button>
          </div>
          <div className='product-filter'>
            <Button onClick={handleFilterClick}>Alicar Flitros</Button>
          </div>
          <div className='product-filter'>
            <p>Ordenar por</p>
            <ProductFilterOrder value={order} onChange={handleChangeOrder} />
          </div>
        </div>
        <div>
          {
            loanding
              ? <div className='home__loading-container'>
                <Loader />
              </div>
              : error
                ? <ErrorMessage message={message} />
                : <ProductList products={products} onClick={onClickCard} onClickAdd={onClickAdd} onClickBuy={onClickBuy} />
          }
        </div>
      </div> */}
    </div>
  )
}

export default Home