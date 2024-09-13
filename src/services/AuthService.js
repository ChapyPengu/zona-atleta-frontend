import axios from './intance/instance'

class AuthService {
  
  static async postLoginRequest({ username, password }) {
    const response = await axios.post('/api/auth/login', {
      username,
      password
    })
    return response.data
  }

  static async postLoginSalesManagerRequest({ username, password }) {
    const response = await axios.post('/api/auth/login-sales-manager', {
      username,
      password
    })
    return response.data
  }

  static async postGoogleLoginRequest(credentials) {
    const response = await axios.post('/api/auth/google-login', {
      credentials
    })
    return response.data
  }

  static async postRegisterRequest({ username, email, password }) {
    const response = await axios.post('/api/auth/register', {
      username,
      email,
      password
    })
    return response.data
  }

  static async postRegisterSalesManagerRequest({ username, password }) {
    const response = await axios.post('/api/auth/register-sales-manager', {
      username,
      password
    })
    return response.data
  }

  static async postLogoutRequest() {
    const response = await axios.post('/api/auth/logout')
    return response.data
  }

  static async postVerifyRequest() {
    const response = await axios.post('/api/auth/verify')
    return response.data
  }
}

export default AuthService