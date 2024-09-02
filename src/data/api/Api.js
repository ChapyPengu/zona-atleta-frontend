import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
  baseURL,
  withCredentials: true
})

class Api {
  
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

  static async postOrderRequest({ products }) {
    const response = await instance.post('/api/order', {
      products
    })
    return response
  }

  static async putOrderByIdRequest({ id }) {
    const response = await instance.put(`/api/order/${id}`)
    return response
  }

  static async getClientsRequest() {
    const response = await instance.get('/api/client/')
    return response
  }

  static async getClientByIdRequest({ id }) {
    const response = await instance.get(`/api/client/${id}`)
    return response
  }

  static async getProductsByFiltersRequest({
    index = null,
    offset = null,
    name = null,
    order = null,
    minPrice = null,
    maxPrice = null
  }) {
    const response = await instance.get(`/api/product/${index}/${offset}/${name}/${order}/${minPrice}/${maxPrice}}`)
    return response
  }

  static async putShoppingCartAddProductByIdRequest({ shoppingCartId, productId }) {
    const response = await instance.post(`/api/shopping-cart/${shoppingCartId}`, {
      productId
    })
    return response
  }

  static async putShoppingCartRemoveProductByIdRequest({ shoppingCartId, productId }) {
    const response = await instance.delete(`/api/shopping-cart/${shoppingCartId}`, {
      productId
    })
    return response
  }

  static async putShoppingCartChangeAmountProductByIdRequest({ shoppingCartId, productId, amount }) {
    const response = await instance.put(`/api/shopping-cart/${shoppingCartId}`, {
      productId,
      amount
    })
    return response
  }

  static async putOrderRequest({ order }) {
    const response = await instance.put(`/api/order/${order.id}`, {
      order
    })
    return response
  }
}

export default Api