import Link from '../Link'

function ClientCard({ client }) {
  return (
    <div className='client-card'>
      <p className='name'>Nombre de usuario: {client.username}</p>
      <p>Correo electronico: {client.email}</p>
      <p>Perfil: {client.profile.name}</p>
      <Link to={`/client/${client.id}/orders`}>Ver pedidos</Link>
    </div>
  )
}

export default ClientCard