import { useEffect, useState } from 'react'
import FormProduct from '../components/forms/FormProduct'
import ProductService from '../services/ProductService'
import PageLoader from '../components/loader/PageLoader'
import Utilities from '../utilities/Utilities'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_URL = 'https://zona-atleta-backend-production.up.railway.app'

function formatearNumeroConPuntos(numero) {
  // Convertir el número a string
  let numStr = numero.toString();

  // Usar una expresión regular para insertar puntos en los miles
  let resultado = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return resultado;
}

function ProductCard({ product }) {

  if (product.image === null)
    return <></>

  return (
    <div className='w-full h-full flex flex-col'>
      <div className=''>
        <img className='w-full rounded-t-md max-h-64 object-cover' src={`${API_URL}${product.image}`} alt={product.name} />
      </div>
      <div className='flex flex-col rounded-b-md bg-primary px-4 py-2 text-white'>
        <p className=''>{product.name}</p>
        <p className='text-xl font-medium'>${formatearNumeroConPuntos(product.price)}</p>
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