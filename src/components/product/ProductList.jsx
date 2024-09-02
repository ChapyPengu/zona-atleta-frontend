import ProductCard from './ProductCard'

function ProductList({ products }) {
  return (
    <div className='product-list'>
      {
        products.map((p, i) => <ProductCard key={i} product={p} />)
      }
    </div>
  )
}

export default ProductList