import { useState, useEffect } from 'react'
import Utilities from '../utilities/Utilities'
import Provider from '../data/provider/Provider'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'

function ProductDetails() {

  const [product, setProduct] = useState({})
  const [loanding, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    async function getProducts() {
      setLoading(true)
      await Utilities.sleep(1)
      setProduct(Provider.getProducts().find(p => p.id == id))
      setLoading(false)
    }
    getProducts()
  }, [])

  return (
    <div className='product-details'>
      {
        loanding
          ? <div className='home__loading-container'>
            <Loader />
          </div>
          : <>
            <p>{product.name}</p>
          </>
      }
    </div>
  )
}

export default ProductDetails