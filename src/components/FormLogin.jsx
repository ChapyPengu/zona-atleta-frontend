import { useState } from 'react'
import Validator from '../utilities/Validator'
import { Link } from 'react-router-dom'
import Button from './Button'
import service from '../data/service'

function FormLogin() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(true)

  function handleChangeUsername(e) {
    setUsername(e.target.value)
    setError(false)
    if (Validator.validateLogin(username, password)) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
    setError(false)
    if (Validator.validateLogin(username, password)) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    async function postLogin() {
      try {
        const response = await service.postLoginRequest({ username, password })
        console.log(response)
      } catch (e) {
        setError(true)
        setErrorMessage('Correo electronico o contraseña incorrectos')
        console.log(e)
      }
    }
    postLogin()
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <p className='form__title'>Inicio de sesion</p>
      {
        error
          ? <p className='form__error-message'>{errorMessage}</p>
          : <></>
      }
      <div className='form__input-container'>
        <label htmlFor='login-username'>Correo electronico:</label>
        <input id='login-username' value={username} onChange={handleChangeUsername} type='text' placeholder='Nombre de usuario' name='Nombre de Usuario' />
      </div>
      <div className='form__input-container'>
        <label htmlFor='login-password'>Contraseña:</label>
        <input id='login-password' value={password} onChange={handleChangePassword} type='password' placeholder='Contraseña' name='Contraseña' />
      </div>
      <div className='login-extra'>
        <div className='login-remember-container'>
          <label htmlFor='login-remember'>Recordar</label>
          <input id='login-remember' type='checkbox' />
        </div>
        <Link>Olvido su contraseña?</Link>
      </div>
      <Button type='submit' disabled={submitDisabled}>Iniciar Sesion</Button>
      <p className='login-not-have-account'>No tienes una cuenta? <Link to='/register'>Registrate</Link></p>
    </form>
  )
}

export default FormLogin