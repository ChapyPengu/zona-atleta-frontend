
function LastCard({ product }) {
  return (
    <div>
      <p>{product.name}</p>
    </div>
  )
}
function LatestAdditions({ loading, last }) {
  return (
    <div>
      {
        last.map((p, i) => <LastCard key={i} product={p} />)
      }
    </div>
  )
}

export default LatestAdditions