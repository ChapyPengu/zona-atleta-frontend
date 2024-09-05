import axios from './intance/instance'

class ProductService {

  // static async getProductsRequest({
  //   index = null,
  //   offset = null,
  //   name = null,
  //   order = null,
  //   minPrice = null,
  //   maxPrice = null
  // }) {
  //   const response = await axios.get(`/api/product/index=${index}/offset=${offset}/name=${name}/min=${minPrice}/max=${maxPrice}}`)
  //   return response.data
  // }

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
}

export default ProductService