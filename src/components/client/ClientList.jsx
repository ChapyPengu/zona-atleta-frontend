import ClientCard from './ClientCard'

function ClientList({ clients }) {

  return (
    <div className='client-list'>
      {
        clients.map((c, i) => <ClientCard key={i} client={c} />)
      }
    </div>
  )
}

export default ClientList