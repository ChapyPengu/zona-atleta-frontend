import { Link } from "react-router-dom"

function ClientCard({ client }) {
  return (
    <div className='client-card'>
      <p className='text-xl font-semibold uppercase'>{client.username}</p>
      <p className=''>{client.email}</p>
      <Link className='cursor-pointer hover:text-primary hover:underline' to={`/client/${client.id}/orders`}>
        Ver pedidos
      </Link>
    </div>
  )
}

export default ClientCard