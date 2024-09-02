import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import service from '../data/service'
import ErrorMessage from '../components/ErrorMessage'

function ProductDetails() {

  const [product, setProduct] = useState({})
  const [loanding, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    async function getProductById() {
      setLoading(true)
      try {
        const response = await service.getProductByIdRequest({ id })
        setProduct(response)
      } catch (e) {
        console.log(e)
        setError(true)
      }
      setLoading(false)
    }
    getProductById()
  }, [])

  return (
    <div className='product-details'>
      {
        loanding
          ? <Loader />
          : error
            ? <ErrorMessage message='Error de servidor' />
            : <p>{product.name}</p>
      }
    </div>
  )
}

export default ProductDetails