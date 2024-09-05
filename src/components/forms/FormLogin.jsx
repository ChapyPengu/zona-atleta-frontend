import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import Validator from '../../utilities/Validator'
import Button from '../Button'

function FormLogin() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [client, setClient] = useState(true)

  const { login, loginSalesManager } = useUser()

  const navigate = useNavigate()

  function handleChangeUsername(e) {
    const value = e.target.value
    setUsername(value)
    setError(false)
    if (Validator.validateLogin(value, password)) {
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
    if (Validator.validateLogin(username, value)) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
    if (value === '') {
      setSubmitDisabled(true)
    }
  }

  function handleClick() {
    setClient(!client)
  }

  function handleSubmit(e) {
    e.preventDefault()
    async function postLogin() {
      try {
        if (client) {
          await login({ username, password })
          navigate('/home')
        } else {
          await loginSalesManager({ username, password })
          navigate('/home')
        }
      } catch (e) {
        console.log(e)
        setError(true)
        setErrorMessage(e.response?.data.message)
      }
    }
    postLogin()
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form__title'>Inicio de sesion</h2>
      {
        error
          ? <p className='form__error-message'>{errorMessage}</p>
          : <></>
      }
      <div className='form__input-container'>
        <label className='form__label' htmlFor='login-username'>
          <input className='form__input' id='login-username' value={username} onChange={handleChangeUsername} type='text' placeholder=' ' />
          <span className='form__text'>Nombre de usuario</span>
        </label>
        <label className='form__label' htmlFor='login-password'>
          <input className='form__input' id='login-password' value={password} onChange={handleChangePassword} type='password' placeholder=' ' />
          <span className='form__text'>Contraseña</span>
        </label>
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
      <p className='form__change-im' onClick={handleClick}>
        {
          client
            ? 'Entrar como jefe de ventas'
            : 'Entrar como cliente'
        }
      </p>
    </form>
  )
}

// Contrase
// Correo electronico:

export default FormLogin