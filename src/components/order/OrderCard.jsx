import { Link } from "react-router-dom"

function getColorByOrderState(state) {
  return {
    anulado: 'cancel',
    pendiente: 'wait',
    confirmado: 'confirmed',
    hecho: 'ready'
  }[state]
}

function OrderCard({ order }) {
  return (
    <div className="order-card">
      <p>Numero de Pedido: {order.id}</p>
      <p className={`order-card__state-${getColorByOrderState(order.state)}`}>{order.state}</p>
      <Link to={`/order/${order.id}`}>
        Ver detalles
      </Link>
    </div>
  )
}

export default OrderCard