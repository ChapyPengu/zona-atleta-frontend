import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import Validator from '../../utilities/Validator'
import Button from '../Button'

function FormRegister() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(true)

  const { register } = useUser()
  const navigate = useNavigate()

  function handleChangeUsername(e) {
    const value = e.target.value
    setUsername(value)
    setError(false)
    if (Validator.validateRegister(value, email, password, passwordRepeat)) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
    if (value === '') {
      setSubmitDisabled(true)
    }
  }

  function handleChangeEmail(e) {
    const value = e.target.value
    setEmail(value)
    setError(false)
    if (Validator.validateRegister(username, value, password, passwordRepeat)) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
    if (value === '') {
      setSubmitDisabled(true)
    }
  }

  function handleChangePassword(e) {
    const value = e.target.value
    setPassword(value)
    setError(false)
    if (Validator.validateRegister(username, email, value, passwordRepeat)) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
    if (value === '') {
      setSubmitDisabled(true)
    }
  }

  function handleChangePasswordRepeat(e) {
    const value = e.target.value
    setPasswordRepeat(value)
    setError(false)
    if (Validator.validateRegister(username, email, password, value)) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
    if (value === '') {
      setSubmitDisabled(true)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await register({ username, email, password })
      navigate('/home')
    } catch (e) {
      setError(true)
      setErrorMessage(e.response.data.message)
      console.log(e)
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <p className='form__title'>Crear Cuenta</p>
      {
        error
          ? <p className='form__error-message'>{errorMessage}</p>
          : <></>
      }
      <div className='form__input-container'>
        <label className='form__label' htmlFor='register-username'>
          <input className='form__input' id='register-username' value={username} onChange={handleChangeUsername} type='text' placeholder=' ' />
          <span className='form__text'>Nombre de usuario</span>
        </label>
        <label className='form__label' htmlFor='register-email'>
          <input className='form__input' id='register-email' value={email} onChange={handleChangeEmail} type='text' placeholder=' ' />
          <span className='form__text'>Correo Electronico</span>
        </label>
        <label className='form__label' htmlFor='register-password'>
          <input className='form__input' id='register-password' value={password} onChange={handleChangePassword} type='password' placeholder=' ' />
          <span className='form__text'>Contraseña</span>
        </label>
        <label className='form__label' htmlFor='register-password-repeat'>
          <input className='form__input' id='register-password-repeat' value={passwordRepeat} onChange={handleChangePasswordRepeat} type='password' placeholder=' ' />
          <span className='form__text'>Repetir Contraseña</span>
        </label>
      </div>
      <Button type='submit' disabled={submitDisabled}>Crear Cuenta</Button>
      <p className='login-not-have-account '>
        Tienes una cuenta? <Link className='' to='/login'>Inicia sesion aqui</Link>
      </p>
    </form>
  )
}

export default FormRegister