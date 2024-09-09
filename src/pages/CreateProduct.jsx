import { useEffect, useState } from 'react'
import FormProduct from '../components/forms/FormProduct'
import ProductService from '../services/ProductService'
import PageLoader from '../components/loader/PageLoader'
import Utilities from '../utilities/Utilities'

function ProductCard({ product }) {

  return (
    <div className='w-full h-full flex flex-col'>
      <div className=''>
        <img className='w-full rounded-t-md max-h-64 object-cover' src={product.image} alt={product.name} />
      </div>
      <div className='flex flex-col rounded-b-md bg-primary px-4 py-2 text-white'>
        <p className=''>{product.name}</p>
        <p className='text-xl font-medium'>${Utilities.formatNumberToPrice(product.price)}</p>
      </div>
    </div>
  )
}

function CreateProduct() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getProducts() {
      setLoading(true)
      try {
        const data = await ProductService.getProductsRequest()
        console.log(data)
        setProducts(data)
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
    getProducts()
  }, [])

  return (
    <div className='grid grid-cols-2 max-w-[1280px] mx-auto py-32'>
      <div>
        <FormProduct products={products} setProducts={setProducts} />
      </div>
      <div className='grid grid-cols-2  gap-12'>
        {
          loading
            ? <PageLoader />
            : products.map((p, i) => <ProductCard key={i} product={p} />)
        }
      </div>
    </div>
  )
}

export default CreateProduct