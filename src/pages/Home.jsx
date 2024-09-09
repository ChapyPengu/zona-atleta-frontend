import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBuy } from '../contexts/BuyContext'
import ProductService from '../services/ProductService'
import Header from '../components/home/Header'
import CategoriesSection from '../components/home/CategoriesSection'
import ProductsSection from '../components/home/ProductsSection'
import SectionCarrousel from '../components/home/SectionCarrousel'

function Home() {

  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [discountedProducts, setDiscountedProducts] = useState([])
  const [loadingDiscountedProducts, setLoadingDiscountedProducts] = useState(false)
  const [popularProducts, setPopularProducts] = useState([])
  const [loadingPopularProducts, setLoadingPopularProducts] = useState(false)
  const [lastProducts, setLastProducts] = useState([])
  const [loadingLastProducts, setLoadingLastProducts] = useState(false)

  const { page } = useParams()
  const navigate = useNavigate()
  const { haveProduct } = useBuy()

  const limit = 20
  const offset = (!page)
    || (isNaN(page))
    || (parseInt(page) < 2) ? 0 : (parseInt(page) - 1) * limit

  useEffect(() => {
    async function getProducts() {
      setLoadingProducts(true)
      try {
        const data = await ProductService.getProducts(offset, limit)
        setProducts(data.results.map(p => ({ ...p, have: haveProduct(p) })))
      } catch (e) {
        console.log(e)
      }
      setLoadingProducts(false)
    }
    getProducts()
  }, [page])

  useEffect(() => {
    async function getDiscounts() {
      setLoadingDiscountedProducts(true)
      try {
        const data = await ProductService.getDiscounts(offset, limit)
        setDiscountedProducts(data.results)
      } catch (e) {
        console.log(e)
      }
      setLoadingDiscountedProducts(false)
    }
    getDiscounts()
  }, [])
  
  useEffect(() => {
    async function getPopulars() {
      setLoadingPopularProducts(true)
      try {
        const data = await ProductService.getPopulars(offset, limit)
        setPopularProducts(data.results)
      } catch (e) {
        console.log(e)
      }
      setLoadingPopularProducts(false)
    }
    getPopulars()
  }, [])
  
  useEffect(() => {
    async function getLast() {
      setLoadingLastProducts(true)
      try {
        const data = await ProductService.getLast(0, 7)
        setLastProducts(data.results)
        console.log(data.results)
      } catch (e) {
        console.log(e)
      }
      setLoadingLastProducts(false)
    }
    getLast()
  }, [])

  return (
    <div className='home w-full'>
      <Header />
      <div className='max-w-[1536px] mx-auto flex flex-col gap-32'>
        <SectionCarrousel loading={loadingDiscountedProducts} title='Descuentos' products={discountedProducts} amount={4} />
        <CategoriesSection title='Categorias' />
        <SectionCarrousel loading={loadingLastProducts} title='Ultimos agregados' products={lastProducts} amount={5} />
        <SectionCarrousel loading={loadingPopularProducts} title='Populares' products={popularProducts} amount={3} />
        <ProductsSection title='Productos' products={products} loading={loadingProducts} page={page} navigate={navigate} />
      </div>
    </div>
  )
}

export default Home