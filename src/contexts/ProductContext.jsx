import { useState, useEffect, useContext, createContext } from 'react'
import Product from '../utilities/Product'
import service from '../data/service'

const ProductContext = createContext()

export function useProduct() {
  const context = useContext(ProductContext)
  if (!context)
    throw new Error('Context not found')
  return context
}

export function ProductContextProvider({ children }) {

  const [allProducts, setAllProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [loanding, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [order, setOrder] = useState('relevant')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [error, setError] = useState(false)
  const [former, setFormer] = useState(true)
  const [next, setNext] = useState(true)
  const [errorFilter, setErrorFilter] = useState(false)

  function handleClickInputPrice(e) {
    e.preventDefault()
    const input = e.target
    const end = input.value.length
    input.setSelectionRange(1, end)
  }

  function handleChangeName(e) {
    const value = e.target.value
    setName(value)
    filter({
      currentName: value
    })
  }

  function handleChangeOrder(e) {
    const value = e.target.value
    setOrder(value)
    filter({
      currentOrder: value
    })
  }

  function handleChangeCategory(category) {
    setCategory(category)
    filter({
      currentCategory: category
    })
  }

  function getHandleChangePrice(type) {
    if (type === 'min') {
      return (e) => {
        const value = Product.formatStringPriceToIntPrice(e.target.value)
        setStart(value)
        filter({
          currentStart: value,
          currentEnd: end
        })
        if (value > end) {
          setError(true)
        } else {
          setError(false)
        }
      }
    } else if (type === 'max') {
      return (e) => {
        const value = Product.formatStringPriceToIntPrice(e.target.value)
        setEnd(value)
        filter({
          currentStart: start,
          currentEnd: value
        })
        if (value < start) {
          setError(true)
        } else {
          setError(false)
        }
      }
    }
  }

  function filter({
    currentName = name,
    currentOrder = order,
    currentStart = start,
    currentEnd = end,
    currentCategory = category
  }) {
    // Filtrar por nombre
    let res = Product.filterByName(allProducts, currentName)

    // Filtrar por orden
    res = Product.filterByOrder(res, currentOrder)
    // Filtrar por precio
    res = Product.filterByRangePrice(res, currentStart, currentEnd)
    // Filtrar por categoria
    if (currentCategory !== '') {
      res = Product.filterByCategory(res, currentCategory)
    }

    setFilterProducts(res)

    if (res.length === 0) {
      setErrorFilter(true)
    } else {
      setErrorFilter(false)
    }
  }

  async function chargeProducts(index, offset) {
    setLoading(true)
    const products = await service.getProductsRequest(index, offset)
    const formerProducts = await service.getProductsRequest(index - offset, offset)
    const nextProducts = await service.getProductsRequest(index + offset, offset)
    // if (formerProducts.length === 0) {
    //   setFormer(false)
    // } else {
    //   setFormer(true)
    // }
    // if (nextProducts.length === 0) {
    //   setNext(false)
    // } else {
    //   setNext(true)
    // }
    setAllProducts(products)
    setFilterProducts(products)
    setCategories(await service.getCategoriesRequest())
    let minPrice = null
    let maxPrice = null
    products.forEach(p => {
      if (minPrice === null) {
        minPrice = p.price
      } else if (p.price < minPrice) {
        minPrice = p.price
      }
      if (maxPrice === null) {
        maxPrice = p.price
      } else if (p.price > maxPrice) {
        maxPrice = p.price
      }
    })
    setStart(minPrice)
    setEnd(maxPrice)
    setLoading(false)
  }

  return (
    <ProductContext.Provider value={{
      name,
      handleChangeName,
      order,
      handleChangeOrder,
      start,
      end,
      error,
      getHandleChangePrice,
      handleClickInputPrice,
      loanding,
      filterProducts,
      chargeProducts,
      former,
      setFormer,
      next,
      setNext,
      errorFilter,
      categories,
      handleChangeCategory,
      category
    }}>
      {children}
    </ProductContext.Provider>
  )
}