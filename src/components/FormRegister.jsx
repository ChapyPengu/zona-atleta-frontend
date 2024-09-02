import { useState } from 'react'
import { Link } from 'react-router-dom'
import Validator from '../utilities/Validator'
import Button from './Button'
import service from '../data/service'

function FormRegister() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(true)

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

  function handleSubmit(e) {
    e.preventDefault()
    async function postRegister() {
      try {
        const response = await service.postRegisterRequest({ username, email, password })
        console.log(response)
      } catch (e) {
        setError(true)
        setErrorMessage('Correo electronico o contraseña incorrectos')
        console.log(e)
      }
    }
    postRegister()
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
        <label htmlFor='register-username'>Nombre de usuario:</label>
        <input id='register-username' value={username} onChange={handleChangeUsername} type='text' placeholder='Nombre de usuario' name='Nombre de usuario' />
      </div>
      <div className='form__input-container'>
        <label htmlFor='register-email'>Correo electronico:</label>
        <input id='register-email' value={email} onChange={handleChangeEmail} type='text' placeholder='Correo electronico' name='Correo electronico' />
      </div>
      <div className='form__input-container'>
        <label htmlFor='register-password'>Contraseña:</label>
        <input id='register-password' value={password} onChange={handleChangePassword} type='password' placeholder='Contraseña' name='Contraseña' />
      </div>
      <div className='form__input-container'>
        <label htmlFor='register-password-repeat'>Repetir contraseña:</label>
        <input id='register-password-repeat' value={passwordRepeat} onChange={handleChangePasswordRepeat} type='password' placeholder='Repetir Contraseña' name='Repetir Contraseña' />
      </div>
      <Button type='submit' disabled={submitDisabled}>Crear Cuenta</Button>
      <p className='login-not-have-account '>
        Tienes una cuenta? <Link className='' to='/login'>Inicia sesion aqui</Link>
      </p>
    </form>
  )
}

export default FormRegister