import ProductList from '../components/product/ProductList'
import ProductFilterOrder from '../components/product/ProductFilterOrder'
import ProductFilterPrice from '../components/product/ProductFilterPrice'
import Loader from '../components/Loader'
import { useProduct } from '../contexts/ProductContext'
import { useEffect, useState } from 'react'
import ProductNextPage from '../components/product/ProductNextPage'
import { useParams, Navigate } from 'react-router-dom'
import Utilities from '../utilities/Utilities'
import ErrorMessage from '../components/ErrorMessage'
import Button from '../components/Button'
import Screen from '../components/Screen'
import ProductFilterCategory from '../components/product/ProductFilterCategory'
import Header from '../components/Header'
import CategoriesCarrousel from '../components/CategoriesCarrousel'

function Home() {

  const [screen, setScreen] = useState(false)
  const { category, start, end, error, handleChangeCategory, getHandleChangePrice, handleClickInputPrice, order, handleChangeOrder, loanding, filterProducts, chargeProducts, errorFilter, categories } = useProduct()
  const { page } = useParams()
  let offset = 15

  function handleClick() {
    setScreen(true)
  }

  function getHandleChangeCategory(category) {
    return () => {
      handleChangeCategory(category)
      setScreen(false)
    }
  }

  useEffect(() => {
    async function charge() {
      if (page === undefined) {
        await chargeProducts(0, offset)
      } else if (!isNaN(parseInt(page)) && parseInt(page) >= 1) {
        await chargeProducts((page - 1) * offset, offset)
      } else {
        console.log('Toy Aqui')
      }
    }
    charge()
  }, [page])

  if (page !== undefined && ((!Utilities.stringIsNumber(page)) || parseInt(page) <= 0 || filterProducts.length === 0))
    return <Navigate to='/home' />

  return (
    <div className='home'>
      {
        screen
          ? <Screen setScreen={setScreen}>
            <ProductFilterCategory categories={categories} getOnClickCard={getHandleChangeCategory} />
          </Screen>
          : <></>
      }
      <div>
        <Header />
      </div>
      <div>
        <CategoriesCarrousel categories={categories} />
      </div>
      <div className='home__products'>
        <div className='product-filters'>
          <ProductNextPage />
          <div className='product-filter'>
            <ProductFilterPrice start={start} end={end} error={error} getOnChange={getHandleChangePrice} onClick={handleClickInputPrice} />
          </div>
          <div className='product-filter'>
            <Button onClick={handleClick}>{category !== '' ? category : 'Categorias'}</Button>
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
                ? <ErrorMessage message='Error de servidor' />
                : errorFilter
                  ? <ErrorMessage message='No se encontraron productos' />
                  : <ProductList products={filterProducts} />
          }
        </div>
      </div>
      {/* <div className='football-container'>
        <img className='football' src="imgs/football-team.jpg" alt="" />
      </div> */}
    </div>
  )
}

export default Home