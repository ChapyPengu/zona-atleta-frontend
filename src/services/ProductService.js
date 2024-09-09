import axios from './intance/instance'

class ProductService {

  static async getProductsRequest() {
    const response = await axios.get('/api/product')
    return response.data
  }

  static async getProductByIdRequest(id) {
    const response = await axios.get(`/api/product/${id}`)
    return response.data
  }

  static async postProductRequest(product) {
    const response = await axios.post('/api/product', product)
    return response.data
  }

  static async postComment(id, message) {
    const comment = await axios.post(`/api/product/${id}/comment`, {
      message
    })
    return comment.data
  }

  static async postResponse(commentId, message) {
    const response = await axios.post(`/api/product/response`, {
      commentId,
      message
    })
    return response.data
  }

  static async getProductsByCategory(name) {
    const response = await axios.get(`/api/product/category/${name}`)
    return response.data
  }

  static async getProductsByName(name) {
    const response = await axios.get(`/api/product/name/${name}`)
    return response.data
  }

  static async getProducts(offset, limit) {
    const response = await axios.get(`/api/product?offset=${offset}&limit=${limit}`)
    return response.data
  }

  static async getDiscounts(offset, limit) {
    const response = await axios.get(`/api/product/from/discount?offset=${offset}&limit=${limit}`)
    return response.data
  }

  static async getPopulars(offset, limit) {
    const response = await axios.get(`/api/product/from/popular?offset=${offset}&limit=${limit}`)
    return response.data
  }

  static async getLast(offset, limit) {
    const response = await axios.get(`/api/product/from/last?offset=${offset}&limit=${limit}`)
    return response.data
  }

  static async put(id, { name, description, available, price, stock }) {
    const response = await axios.put(`/api/product/${id}`, {
      name,
      description,
      price,
      stock,
      available
    })
    return response.data
  }
}

export default ProductService