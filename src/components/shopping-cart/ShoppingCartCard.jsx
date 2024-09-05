import { useState } from 'react'
import Delete from '../icons/Delete'
import Edit from '../icons/Edit'
import Plus from '../icons/Plus'
import Minus from '../icons/Minus'
import Xmark from '../icons/Xmark'
import Utilities from '../../utilities/Utilities'

function ShoppingCartCard({ product, onClickMoreProduct, onClickLessProduct, onClickDeleteProduct }) {

  const [edit, setEdit] = useState(false)

  const totalPrice = product.price * product.amount

  function handleClickEdit() {
    setEdit(!edit)
  }

  return (
    <div className='shopping-cart-card'>
      <div className='shopping-cart-card__img-container'>
        {
          product.image === null
            ? <img className='' src={Utilities.randomImg()} alt={product.name} />
            : <></>
        }
      </div>
      <div className='shopping-cart-card__content'>
        <p className='shopping-cart-card__name'>{product.name}</p>
        <p className='shopping-cart-card__category'>Categoria: {product.category.name}</p>
        <p className='shopping-cart-card__stock'>Unidades disponibles: {product.stock}</p>
        <p className='shopping-cart-card__price'>Precio: ${product.price}</p>
        <p className='shopping-cart-card__amount'>Unidades actuales: {product.amount}</p>
        <p className='shopping-cart-card__total-price'>Total: ${totalPrice}</p>
      </div>
      <div className='shopping-cart-card__btn-container'>
        {
          edit
            ? (
              <div className='shopping-cart-card__btn-edit-container'>
                <button className='shopping-cart-card__btn' onClick={() => onClickLessProduct(product)}>
                  <Minus className='shopping-cart-card__icon' />
                </button>
                <button className='shopping-cart-card__btn' onClick={handleClickEdit}>
                  <Xmark className='shopping-cart-card__icon' />
                </button>
                <button className='shopping-cart-card__btn' onClick={() => onClickMoreProduct(product)}>
                  <Plus className='shopping-cart-card__icon' />
                </button>
              </div>
            )
            : <button className='shopping-cart-card__btn' onClick={handleClickEdit}>
              <Edit className='shopping-cart-card__icon' />
            </button>
        }
        {
          edit
            ? <></>
            : <button className='shopping-cart-card__btn' onClick={() => onClickDeleteProduct(product)}>
              <Delete className='shopping-cart-card__icon' />
            </button>
        }
      </div>
    </div>
  )
}

export default ShoppingCartCard