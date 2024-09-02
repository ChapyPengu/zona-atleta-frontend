import client from '../client.json'
import salesManager from '../salesManager.json'
import clients from '../clients.json'
import products from '../products.json'
import categories from '../categories.json'
import orders from '../orders.json'
import Utilities from '../../utilities/Utilities'

const baseURL = ''

class Provider {

  static url() {
    return baseURL
  }

  static async postLoginRequest({ username, password }) {
    await Utilities.sleep(1)
    return client
  }

  static async postRegisterRequest({ username, email, password }) {
    await Utilities.sleep(1)
    return client
  }

  static async postLogoutRequest() {
    await Utilities.sleep(1)
  }

  static async postVerifyRequest() {
    await Utilities.sleep(1)

  }

  static async getProductsRequest(index = null, offset = null) {
    await Utilities.sleep(1)
    if (index === null || offset === null) {
      return products
    }
    if (index < 0 || offset <= 0) {
      return []
    }
    return products.slice(index, index + offset)
  }

  static async getProductByIdRequest({ id }) {
    await Utilities.sleep(1)
    const found = products.find(p => p.id === id)
    return found
  }

  static async getOrdersRequest() {
    await Utilities.sleep(1)
    return orders
  }

  static async getOrdersOfClientByIdRequest({ id }) {
    await Utilities.sleep(1)
    const ordersFound = orders.filter(o => o.clientId === id)
    return ordersFound
  }

  static async getOrderByIdRequest({ id }) {
    await Utilities.sleep(1)
    const found = orders.find(o => o.id === id)
    return found
  }

  static async postOrderRequest() {
    await Utilities.sleep(1)
  }

  static async putOrderByIdRequest() {
    await Utilities.sleep(1)
  }

  static async getCategoriesRequest() {
    await Utilities.sleep(1)
    return categories
  }

  static async postCalificationRequest() {
    await Utilities.sleep(1)
  }

  static async postCommentRequest() {
    await Utilities.sleep(1)
  }

  static async postLoginSalesManagerRequest({ username, password }) {
    await Utilities.sleep(1)
    return salesManager
  }

  static async getClientByIdRequest({ id }) {
    await Utilities.sleep(1)
    const found = clients.find(c => c.id === id)
    return found
  }

  static async getClientsRequest() {
    await Utilities.sleep(1)
    return clients
  }

  static async getProductsByFiltersRequest({
    index = null,
    offset = null,
    name = null,
    order = null,
    minPrice = null,
    maxPrice = null
  }) {
    await Utilities.sleep(1)
    return products
  }
}

export default Provider