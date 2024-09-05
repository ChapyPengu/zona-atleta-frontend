
function DiscountCard({ product }) {
  return (
    <div>
      <p>{product.name}</p>
    </div>
  )
}

function DiscountSection({ loading, discounts }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {
        discounts.map((p, i) => <DiscountCard key={i} p={p}/>)
      }
    </div>
  )
}

export default DiscountSection