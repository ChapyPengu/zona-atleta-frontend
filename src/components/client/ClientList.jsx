import ClientCard from './ClientCard'

function ClientList({ clients }) {

  return (
    <div>
      {
        clients.map((c, i) => <ClientCard key={i} client={c} />)
      }
    </div>
  )
}

export default ClientList