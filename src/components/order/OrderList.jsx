import OrderCard from './OrderCard'

function OrderList({ orders }) {
  return (
    <div className='order-list'>
      {
        orders.map((o, i) => <OrderCard key={i} order={o} />)
      }
    </div>
  )
}

export default OrderList