import client from '../client.json'
import salesManager from '../salesManager.json'
import clients from '../clients.json'
import products from '../products.json'
import categories from '../categories.json'
import orders from '../orders.json'

class Provider {

  static getNone() {
    return null
  }

  static getClient() {
    return client
  }

  static getSalesManager() {
    return salesManager
  }

  static getUser() {
    return this.getNone()
  }
  
  static getClients() {
    return clients
  }
  
  static getProducts(index = null, offset = null) {
    if (index === null || offset === null) {
      return products
    }
    if (index < 0 || offset <= 0) {
      return []
    }
    return products.slice(index, index + offset)
  }

  static getCategories() {
    return categories
  }

  static getOrders() {
    return orders
  }
}

export default Provider