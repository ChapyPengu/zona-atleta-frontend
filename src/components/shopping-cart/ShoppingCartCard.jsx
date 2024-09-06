import { useState } from 'react'
import Delete from '../icons/Delete'
import Edit from '../icons/Edit'
import Plus from '../icons/Plus'
import Minus from '../icons/Minus'
import Xmark from '../icons/Xmark'
import Utilities from '../../utilities/Utilities'
import { API_URL } from '../../config/config'
import Button from '../Button'
import Loader from 'react-spinners/ClipLoader'
import { useBuy } from '../../contexts/BuyContext'

function formatearNumeroConPuntos(numero) {
  // Convertir el número a string
  let numStr = numero.toString();

  // Usar una expresión regular para insertar puntos en los miles
  let resultado = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return resultado;
}

function ShoppingCartCard({ product, onClickMoreProduct, onClickLessProduct, onClickDeleteProduct }) {

  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [edit, setEdit] = useState(false)

  const totalPrice = product.price * product.amount

  const { deleteProduct, editProduct, products, setProducts } = useBuy()

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
          {
            product.image === null
              ? <img className='w-48 h-48 bg-primary' src={Utilities.randomImg()} alt={product.name} />
              : <img className='w-48 h-48 bg-primary' src={`${API_URL}/${product.image}`}></img>
          }
        </div>

      </div>
      <div className='w-full flex flex-col gap-8'>
        <div className='flex flex-col gap-1'>
          <p className='text-xl'>{product.name}</p>
          <p className='font-medium'>Precio por unidad: ${formatearNumeroConPuntos(product.price)}</p>
          <p className='font-medium'>Unidades actuales: {product.amount}</p>
          {/* <p className=''>Disponibles: {product.stock}</p> */}
          <p className='text-lg font-bold'>Total: ${formatearNumeroConPuntos(totalPrice)}</p>
        </div>
        <div className='flex justify-center gap-4 w-full'>
          {
            edit
              ? (
                <div className='flex gap-4'>
                  <Button disabled={loadingDelete || loadingEdit} className='' onClick={handleClickEditMinus}>
                    {
                      loadingEdit
                        ? <Loader color='white' />
                        : <Minus className='' />
                    }
                  </Button>
                  <Button disabled={loadingDelete || loadingEdit} className='' onClick={handleClickEdit}>
                    <Xmark className='' />
                  </Button>
                  <Button disabled={loadingDelete || loadingEdit} className='' onClick={handleClickEditAdd}>
                    {
                      loadingEdit
                        ? <Loader color='white' />
                        : <Plus className='' />
                    }
                  </Button>
                </div>
              )
              : <Button disabled={loadingDelete || loadingEdit} className='' onClick={handleClickEdit}>
                <Edit className='' />
              </Button>
          }
          {
            edit
              ? <></>
              : <Button disabled={loadingDelete || loadingEdit} className='' onClick={handleClickDelete}>
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