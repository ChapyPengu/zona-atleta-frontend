import { API_URL } from "../../config/config"


function DiscountCard({ product }) {
  console.log(product)
  return (
    <div>
      {/* <p>{product.name}</p> */}
      <img src={`${API_URL}${product.image}`} alt="" />
    </div>
  )
}

function DiscountSection({ loading, discounts }) {
  return (
    <div className="">
      <div>
        <h4>DiscountSection</h4>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {
          discounts.map((p, i) => <DiscountCard key={i} product={p} />)
        }
      </div>
    </div>
  )
}

export default DiscountSection