import { useParams, useNavigate } from 'react-router-dom'
import { useProduct } from '../../contexts/ProductContext'
import Button from '../Button'
import ArrowRight from '../icons/ArrowRight'
import ArrowLeft from '../icons/ArrowLeft'

function ProductNextPageItem({ onClick = () => { }, hidden = false, children }) {
  return (
    <button className={`product-next-page-item ${hidden ? 'product-next-page-item-hidden' : ''}`} onClick={onClick}>
      {children}
    </button>
  )
}

function ProductNextPage() {

  const navigate = useNavigate()
  const { page } = useParams()
  const { former, next } = useProduct()

  function getHandleClick(type) {
    if (type === 'former') {
      return () => {
        if (page !== undefined && parseInt(page) - 1 > 0) {
          navigate(`/home/page/${parseInt(page) - 1}`)
        }
      }
    } else if (type === 'next') {
      return () => {
        if (page === undefined) {
          navigate(`/home/page/${2}`)
        } else {
          navigate(`/home/page/${parseInt(page) + 1}`)
        }
      }
    }
  }

  return (
    <div className='product-next-page-container'>
      <Button className='product-next-page__btn' onClick={getHandleClick('former')}>
        <ArrowLeft />
      </Button>
      <Button className='product-next-page__btn' onClick={getHandleClick('next')}>
        <ArrowRight />
      </Button>
    </div >
  )
}

export default ProductNextPage