import { useState } from 'react'
import { useBuy } from '../../contexts/BuyContext'
import Loader from 'react-spinners/ClipLoader'
import Delete from '../icons/Delete'
import Edit from '../icons/Edit'
import Plus from '../icons/Plus'
import Minus from '../icons/Minus'
import Button from '../Button'

function formatearNumeroConPuntos(numero) {
  let numStr = numero.toString();
  let resultado = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return resultado;
}

function ShoppingCartCard({ product, onClickMoreProduct, onClickLessProduct, onClickDeleteProduct }) {

  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [edit, setEdit] = useState(false)

  const totalPrice = product.price * product.amount

  const { deleteProduct, editProduct, products, setProducts } = useBuy()

  const waitOperation = loadingDelete || loadingEdit
  
  function handleClickEdit() {
    setEdit(!edit)
  }
  async function handleClickEditMinus() {
    setLoadingEdit(true)
    await editProduct(product, { amount: product.amount - 1 })
    products.find(p => parseInt(p.id) === parseInt(product.id)).amount -= 1
    setProducts([...products])
    setLoadingEdit(false)
  }

  async function handleClickEditAdd() {
    setLoadingEdit(true)
    await editProduct(product, { amount: product.amount + 1 })
    products.find(p => parseInt(p.id) === parseInt(product.id)).amount += 1
    setProducts([...products])
    setLoadingEdit(false)
  }

  async function handleClickDelete() {
    setLoadingDelete(true)
    await deleteProduct(product)
    setProducts(products.filter(p => parseInt(p.id) === parseInt(product.id)))
    setLoadingDelete(false)
  }

  return (
    <div className='w-full flex gap-8'>
      <div className='flex flex-col gap-4'>
        <div className='grid place-items-center'>
          <img className='min-w-48 min-h-48 bg-primary object-cover' src={product.image}></img>
        </div>
      </div>
      <div className='w-full flex flex-col gap-8'>
        <div className='flex flex-col gap-1'>
          <p className='text-xl'>{product.name}</p>
          <p className='font-medium'>Precio por unidad: ${formatearNumeroConPuntos(product.price)}</p>
          <p className=''>Disponibles: {product.stock}</p>
          <p className='text-lg font-bold'>Total: ${formatearNumeroConPuntos(totalPrice)}</p>
        </div>
        <div className='flex justify-center gap-4 w-full'>
          {
            edit
              ? (
                <div className='flex gap-4 bg-primary py-2 px-4 rounded-full'>
                  <button disabled={waitOperation} className='' onClick={handleClickEditMinus}>
                    {
                      loadingEdit
                        ? <Loader color='white' />
                        : <Minus className='fill-white' />
                    }
                  </button>
                  <button disabled={waitOperation} className='text-white font-black' onClick={handleClickEdit}>
                    {product.amount}
                  </button>
                  <button disabled={waitOperation} className='' onClick={handleClickEditAdd}>
                    {
                      loadingEdit
                        ? <Loader color='white' />
                        : <Plus className='fill-white' />
                    }
                  </button>
                </div>
              )
              : <Button disabled={waitOperation} className='' onClick={handleClickEdit}>
                <Edit className='' />
              </Button>
          }
          {
            edit
              ? <></>
              : <Button disabled={waitOperation} className='' onClick={handleClickDelete}>
                {
                  loadingDelete
                    ? <Loader color='white' />
                    : <Delete className='' />

                }
              </Button>
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartCard