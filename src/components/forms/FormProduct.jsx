import { useEffect, useState } from 'react'
import ProductService from '../../services/ProductService'
import CategoryService from '../../services/CategoryService'
import Button from '../Button'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function FormProduct() {

  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState(0)
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const [categories, setCategories] = useState([])

  function handleChangeName(e) {
    const value = e.target.value
    setName(value)
    setError(false)
  }

  function handleChangeCategory(e) {
    const value = e.target.value
    setCategoryId(value)
    setError(false)
  }

  function handleChangeDescription(e) {
    const value = e.target.value
    setDescription(value)
    setError(false)
  }

  function handleChangePrice(e) {
    const value = e.target.value
    setPrice(value)
    setError(false)
  }

  function handleChangeStock(e) {
    const value = e.target.value
    setStock(value)
    setError(false)
  }

  function handleChangeImage(e) {
    const value = e.target.files
    setImage(value)
    setError(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      MySwal.fire({
        title: <p>Creando producto...</p>,
        icon: 'success',
        showCloseButton: false,
        showConfirmButton: false
      })
      const formData = new FormData()
      formData.append('name', name)
      formData.append('categoryId', categoryId)
      // formData.append('description', description)
      // formData.append('price', price)
      // formData.append('stock', stock)
      formData.append('image', image[0])
      await ProductService.postProductRequest(formData)
      MySwal.close()
    } catch (e) {
      setError(true)
      setErrorMessage(e.response?.data.message)
      console.log(e)
    }
  }

  useEffect(() => {
    async function getCategories() {
      setSubmitDisabled(true)
      try {
        const data = await CategoryService.getCategoriesRequest()
        setCategories(data)
        if (data.length > 0) {
          setCategoryId(data[0].id)
        }
      } catch (e) {
        console.log(e)
      }
      setSubmitDisabled(false)
    }
    getCategories()
  }, [])

  return (
    <form className='form' onSubmit={handleSubmit}>
      <p className='form__title'>Nuevo Producto</p>
      {
        error
          ? <p className='form__error-message'>{errorMessage}</p>
          : <></>
      }
      <div className='form__input-container'>
        <div className='flex flex-col gap-2'>
          <span className='form__text'>Nombre</span>
          <input className='form__input' id='register-username' value={name} onChange={handleChangeName} type='text' placeholder=' ' required />
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex gap-8'>
            <label className='block bg-transparent border-none outline-none text-lg' htmlFor='form-category'>Categoria</label>
            <select className='block bg-transparent border-none outline-none text-lg' onChange={handleChangeCategory}>
              {
                categories.map((c, i) => <option key={i} value={c.id}>{c.name}</option>)
              }
            </select>
          </div>
          <div className='flex gap-8'>
            <label className='block bg-transparent border-none outline-none text-lg' htmlFor='register-password-repeat'>Imagen</label>
            <input className='block bg-transparent border-none outline-none text-lg' id='register-password-repeat' onChange={handleChangeImage} type='file' placeholder=' ' required />
          </div>
        </div>
        {/* <label className='form__label' htmlFor='register-password'>
          <input className='form__input' id='register-password' value={description} onChange={handleChangeDescription} type='text' placeholder=' ' />
          <span className='form__text'>Descripcion</span>
        </label> */}
        {/* <label className='form__label' htmlFor='register-password-repeat'>
          <input className='form__input' id='register-password-repeat' value={price} onChange={handleChangePrice} type='text' placeholder=' ' required />
          <span className='form__text'>Precio</span>
        </label> */}
        {/* <label className='form__label' htmlFor='register-password-repeat'>
          <input className='form__input' id='register-password-repeat' value={stock} onChange={handleChangeStock} type='text' placeholder=' ' required />
          <span className='form__text'>Unidades Disponibles</span>
        </label> */}
      </div>
      <Button type='submit' disabled={submitDisabled}>Crear Producto</Button>
    </form>
  )
}

export default FormProduct