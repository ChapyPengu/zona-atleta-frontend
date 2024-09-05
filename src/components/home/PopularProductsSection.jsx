
function PopularCard({ product }) {
  return (
    <div>
      {product.name}
    </div>
  )
}
function PopularProductsSection({ loading, popular }) {
  return (
    <div>
      {
        popular.map((p, i) => <PopularCard key={i} product={p}/>)
      }
    </div>
  )
}

export default PopularProductsSection