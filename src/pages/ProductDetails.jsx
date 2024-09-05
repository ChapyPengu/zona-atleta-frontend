import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductService from '../services/ProductService'
import Utilities from '../utilities/Utilities'
import Loader from '../components/loader/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { useUser } from '../contexts/UserContext'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function ResponseCard({ response }) {
  console.log(response)
  return (
    <div>
      {response.message}
      hola
    </div>
  )
}

function CommentCard({ comment }) {

  const [response, setResponse] = useState(comment.response)
  const [currentResponse, setCurrentResponse] = useState('')

  const user = useUser()

  console.log(comment)

  async function handleClick() {
    const responseBefore = response
    const currentResponseBefore = currentResponse
    try {
      setResponse({ message: currentResponse })
      setCurrentResponse('')
      const data = await ProductService.postResponse(comment.id, currentResponse)
      setResponse(data)
      setCurrentResponse('')
      console.log(data)
    } catch (e) {
      setResponse(responseBefore)
      setCurrentResponse(currentResponseBefore)
      console.log(e)
    }
  }

  function handleChange(e) {
    setCurrentResponse(e.target.value)
  }

  return (
    <div>
      <div>
        <p>{comment.message}</p>
      </div>
      <div>
        {
          response === null || response === undefined
            ? user.isSalesManager()
              ? <div>
                <input value={currentResponse} type="text" placeholder='Responder Comentario' onChange={handleChange} />
                <button onClick={handleClick}>Responder</button>
              </div>
              : <></>
            : <ResponseCard response={response} />
        }
      </div>
    </div>
  )
}

function ProductDetailsLayout({ product }) {

  const [comments, setComments] = useState([...product.comments])
  const [comment, setComment] = useState('')

  const user = useUser()

  function handleChange(e) {
    setComment(e.target.value)
  }

  async function handleClick() {
    const beforeComments = [...comments]
    const beforeComment = comment.slice(0, comment.length - 1)
    try {
      setComments([...comments, { message: comment }])
      setComment('')
      const data = await ProductService.postComment(product.id, comment)
      setComment([...beforeComment, data])
      console.log(data)
    } catch (e) {
      setComments(beforeComments)
      setComment(beforeComment)
      console.log(e)
    }
  }

  return (
    <div className='flex justify-center items-center flex-col'>
      <div>
        <p className='product-details__name'>{product.name}</p>
      </div>
      <div>
        <p className='product-details__description'>{product.description}</p>
      </div>
      <div className=''>
        <img className='product-details__img' src={`${BACKEND_URL}${product.image}`} />
      </div>
      <div>
        <button>Comprar</button>
        <button>Agregar Al Carrito</button>
      </div>
      {
        user.isClient()
          ? <div>
            <input value={comment} type="text" placeholder='Agrege un comentario' onChange={handleChange} />
            <button onClick={handleClick}>Agregar</button>
          </div>
          : <></>
      }

      <div className='bg-white px-4 py-2 flex flex-col justify-center items-center gap-4 '>
        {
          comments.map((c, i) => <CommentCard key={i} comment={c} />)
        }
      </div>
    </div>
  )
}

function ProductDetails() {

  const [product, setProduct] = useState({})
  const [loanding, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    async function getProductById() {
      setLoading(true)
      try {
        console.log(id)
        const response = await ProductService.getProductByIdRequest(id)
        setProduct(response)
      } catch (e) {
        console.log(e)
        setError(true)
      }
      setLoading(false)
    }
    getProductById()
  }, [id])

  return (
    <div className='product-details'>
      {
        loanding
          ? <Loader />
          : error
            ? <ErrorMessage message='Error de servidor' />
            : <ProductDetailsLayout product={product} />
      }
    </div>
  )
}

export default ProductDetails