import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import Validator from '../../utilities/Validator'
import Button from '../Button'
import Input from '../Input'
import Lock from '../icons/Lock'
import User from '../icons/User'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function FormLogin() {

  const [profile, setProfile] = useState([])
  const [user, setUser] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [client, setClient] = useState(true)

  const { login, loginSalesManager, googleLogin } = useUser()

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

  async function handleGoogleLogin(token) {
    console.log(token)
    try {
      // await googleLogin(credentialResponse)
      const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
      // setProfile(res.data)
      console.log(res.data)
      navigate('/home')
    } catch (e) {
      console.log(e)
    }
  }

  const googleLoginUse = useGoogleLogin({
    onSuccess: (res) => {
      setUser(res)
      console.log('res', res)
    },
    onError: (err) => console.log(err)
  })


  useEffect(() => {
    console.log(user.access_token)
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          console.log(res.data)
        })
        .catch((err) => console.log(err));
    }
  }, [user])

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div>
        <h2 className='text-3xl mb-4'>Inicio de sesion</h2>
        {
          error
            ? <p className='text-red-500 mb-2 text-center'>{errorMessage}</p>
            : <></>
        }
      </div>
      <div className='flex flex-col gap-8'>
        <Input error={error} placeholder='Nombre de usuario' value={username} onChange={handleChangeUsername} icon={<User />} />
        <Input error={error} placeholder='Contraseña' type='password' value={password} onChange={handleChangePassword} icon={<Lock />} />
      </div>
      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <label htmlFor='login-remember'>Recordar</label>
          <input id='login-remember' type='checkbox' />
        </div>
        <Link className='text-red-700 hover:underline'>Olvido su contraseña?</Link>
      </div>
      <Button type='submit' disabled={submitDisabled}>Iniciar Sesion</Button>
      <button onClick={googleLoginUse}>Login with google</button>
      {/* {
        client
          ? <div className='block mx-auto max-w-64 rounded-full'>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
          : <></>
      } */}
      <div className='flex flex-col items-center gap-4'>
        <p className='login-not-have-account'>No tienes una cuenta? <Link className='text-red-700 hover:underline' to='/register'>Registrate</Link></p>
        <p className='text-red-500 cursor-pointer hover:underline hover:text-red-700' onClick={handleClick}>
          {
            client
              ? 'Entrar como jefe de ventas'
              : 'Entrar como cliente'
          }
        </p>
      </div>
    </form>
  )
}

// Contrase
// Correo electronico:

export default FormLogin