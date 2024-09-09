import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from 'react-spinners/ClipLoader'
import { toast } from 'react-toastify'
import ProductService from '../services/ProductService'
import Utilities from '../utilities/Utilities'
import ErrorMessage from '../components/ErrorMessage'
import { useUser } from '../contexts/UserContext'
import { API_URL } from '../config/config'
import Button from '../components/Button'
import Like from '../components/icons/Like'
import ClientService from '../services/ClientService'


function ResponseCard({ response }) {
  return (
    <div>
      <p>{response.message}</p>
    </div>
  )
}

function CommentCard({ comment }) {

  const [response, setResponse] = useState(comment.response)
  const [currentResponse, setCurrentResponse] = useState('')

  const user = useUser()

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
              ? <div className='flex gap-8'>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={currentResponse} type="text" placeholder='Responder Comentario' onChange={handleChange} />
                <Button onClick={handleClick}>Responder</Button>
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
  const [loadingFavorites, setLoadingFavorites] = useState(false)

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

  async function addFavorites() {
    setLoadingFavorites(true)
    try {
      const data = await ClientService.postFavorite(user.id, product.id)
      toast('Se agrego a favoritos', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } catch (e) {
      console.log(e)
    }
    setLoadingFavorites(false)
  }

  return (
    <div className='flex justify-center items-center flex-col py-16 gap-8'>
      <div>
        <p className='product-details__name'>{product.name}</p>
      </div>
      <div>
        <p className='product-details__description'>{product.description}</p>
      </div>
      <div className='flex justify-start items-start gap-8'>
        <img className='product-details__img' src={product.image} />
        <div className='flex flex-col justify-start items-start gap-6'>
          <p className='text-4xl font-semibold'>${product.price}</p>
          <div>
            <p className='text-xl font-normal'>Unidades disponibles: {product.stock}</p>
          </div>
          <div className='flex gap-4'>
            <Button className=''>
              Comprar
            </Button>
            <Button variant='outline'>
              Agregar al Carrito
            </Button>
          </div>
          {
            user.isClient()
              ? <Button onClick={addFavorites} className='flex justify-center items-center gap-4'>
                {
                  loadingFavorites
                    ? <Loader color='white' />
                    : <>
                      Agregar a favoritos
                      <Like />
                    </>
                }
              </Button>
              : <></>
          }

        </div>
      </div>
      <div className='bg-primary w-[1024px] h-[2px] rounded-full'>
      </div>
      <div className='flex flex-col gap-8'>
        <h4 className='text-center text-2xl'>Comentarios</h4>
        {
          user.isNone()
            ? <Button>Inicia sesion para agregar comentarios</Button>
            : <></>
        }
        {
          user.isClient()
            ? <div className='flex gap-4'>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={comment} type="text" placeholder='Agrege un comentario' onChange={handleChange} />
              <Button onClick={handleClick}>Agregar</Button>
            </div>
            : <></>
        }
        {
          comments.length === 0
            ? <p className='text-center'>El articulo no tiene comentarios</p>
            : <div className='bg-white px-4 py-2 flex flex-col justify-center items-center gap-4 '>
              {
                comments.map((c, i) => <CommentCard key={i} comment={c} />)
              }
            </div>
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
          ? <div className='w-full h-96 grid place-items-center'>
            <Loader />
          </div>
          : error
            ? <ErrorMessage message='Error de servidor' />
            : <ProductDetailsLayout product={product} />
      }
    </div>
  )
}

export default ProductDetails