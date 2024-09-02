import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
  baseURL,
  withCredentials: true
})

class Service {
  
  static url() {
    return baseURL
  }

  static async postLoginRequest({ email, password }) {
    const response = await instance.post('/api/login')
    return response
  }

  static async postRegisterRequest({ username, email, password }) {
    const response = await instance.post('/api/register')
    return response
  }

  static async postLogoutRequest() {
    const response = await instance.post('/api/logout')
    return response
  }

  static async postVerifyRequest() {
    const response = await instance.post('/api/verify')
    return response
  }

  static async getProductsRequest() {
    const response = await instance.get('/api/product')
    return response
  }

  static async getProductByIdRequest({ id }) {
    const response = await instance.get(`/api/product/${id}`)
    return response
  }

  static async getOrdersRequest() {
    const response = await instance.get('/api/order')
    return response
  }

  static async getOrderByIdRequest({ id }) {
    const response = await instance.get(`/api/order/${id}`)
    return response
  }

  static async postOrderRequest() {
    const response = await instance.post('/api/order')
    return response
  }

  static async putOrderByIdRequest({ id }) {
    const response = await instance.put(`/api/order/${id}`)
    return response
  }
}

export default Service