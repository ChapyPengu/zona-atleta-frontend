import axios from './intance/instance'

class ProductService {

  static async getProductsRequest(offset, limit, { name, category, gender } = {}) {
    let query = `/api/product?offset=${offset}&limit=${limit}`
    if (name) {
      query += `&name=${name}`
    }
    if (category) {
      query += `&category=${category}`
    }
    if (gender) {
      query += `&gender=${gender}`
    }
    const response = await axios.get(query)
    return response.data
  }

  static async getProductByIdRequest(id, { clientId } = {}) {
    const response = await axios.get(`/api/product/${id}`, {
      clientId,
    })
    return response.data
  }

  static async postProductRequest(product) {
    const response = await axios.post('/api/product', product)
    return response.data
  }

  static async postComment({ clientId, productId, message }) {
    const comment = await axios.post(`/api/product/${productId}/comment`, {
      message,
      clientId
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

  static async getCommentNotView() {
    const response = await axios.get('/api/product/get/comment')
    return response.data
  }

  static async getResponseNotView({ clientId }) {
    const response = await axios.get(`/api/product/${clientId}/response`)
    return response.data
  }

  static async putCommentView({ commentId }) {
    const response = await axios.put(`/api/product/${commentId}/comment`)
    console.log(response.data)
    return response.data
  }

  static async putResponseView({ clientId }) {
    const response = await axios.put(`/api/product/${clientId}/response`)
    return response.data
  }
}

export default ProductService